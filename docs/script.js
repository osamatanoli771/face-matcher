// API Configuration - Update this after deploying backend
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5001'
    : 'YOUR_RENDER_BACKEND_URL_HERE'; // Replace with your Render backend URL

// State management
let image1Data = null;
let image2Data = null;

// DOM Elements
const uploadZone1 = document.getElementById('upload-zone-1');
const uploadZone2 = document.getElementById('upload-zone-2');
const fileInput1 = document.getElementById('file-input-1');
const fileInput2 = document.getElementById('file-input-2');
const preview1 = document.getElementById('preview-1');
const preview2 = document.getElementById('preview-2');
const previewImg1 = document.getElementById('preview-img-1');
const previewImg2 = document.getElementById('preview-img-2');
const removeBtn1 = document.getElementById('remove-1');
const removeBtn2 = document.getElementById('remove-2');
const compareBtn = document.getElementById('compare-btn');
const btnText = document.getElementById('btn-text');
const resultsSection = document.getElementById('results-section');
const errorMessage = document.getElementById('error-message');

// Initialize upload zones
function initUploadZone(zone, input, preview, previewImg, imageDataKey) {
    // Click to upload
    zone.addEventListener('click', () => input.click());

    // File input change
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file, preview, previewImg, imageDataKey, zone);
        }
    });

    // Drag and drop
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('dragover');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file, preview, previewImg, imageDataKey, zone);
        }
    });
}

// Handle file upload
function handleFile(file, preview, previewImg, imageDataKey, zone) {
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
        showError('File size must be less than 10MB');
        return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('Please upload a valid image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const imageData = e.target.result;

        // Store image data
        if (imageDataKey === 1) {
            image1Data = imageData;
        } else {
            image2Data = imageData;
        }

        // Show preview
        previewImg.src = imageData;
        preview.classList.add('active');
        zone.style.display = 'none';

        // Enable compare button if both images are uploaded
        updateCompareButton();

        // Hide error message
        hideError();
    };
    reader.readAsDataURL(file);
}

// Remove image
function removeImage(imageDataKey, preview, zone, input) {
    if (imageDataKey === 1) {
        image1Data = null;
    } else {
        image2Data = null;
    }

    preview.classList.remove('active');
    zone.style.display = 'block';
    input.value = '';

    updateCompareButton();
    hideResults();
}

// Update compare button state
function updateCompareButton() {
    if (image1Data && image2Data) {
        compareBtn.disabled = false;
    } else {
        compareBtn.disabled = true;
    }
}

// Compare faces
async function compareFaces() {
    if (!image1Data || !image2Data) {
        showError('Please upload both images');
        return;
    }

    // Show loading state
    compareBtn.classList.add('loading');
    compareBtn.disabled = true;
    hideError();
    hideResults();

    // Enhanced loading messages with timer
    let loadingTime = 0;
    let loadingMessages = [
        'Analyzing faces...',
        'Processing facial features...',
        'Comparing face encodings...',
        'Calculating similarity...'
    ];
    let messageIndex = 0;

    btnText.innerHTML = `${loadingMessages[0]}<span class="loading-spinner"></span>`;

    // Update loading message every 3 seconds
    const loadingInterval = setInterval(() => {
        loadingTime += 3;
        messageIndex = (messageIndex + 1) % loadingMessages.length;

        if (loadingTime <= 15) {
            btnText.innerHTML = `${loadingMessages[messageIndex]}<span class="loading-spinner"></span>`;
        } else if (loadingTime <= 30) {
            btnText.innerHTML = `Downloading AI model (first time only)...<span class="loading-spinner"></span>`;
        } else {
            btnText.innerHTML = `Still processing... (${loadingTime}s)<span class="loading-spinner"></span>`;
        }
    }, 3000);

    try {
        const startTime = Date.now();

        const response = await fetch(`${API_URL}/api/compare`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image1: image1Data,
                image2: image2Data
            })
        });

        const data = await response.json();
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);

        if (!response.ok) {
            throw new Error(data.error || 'Failed to compare faces');
        }

        // Display results
        displayResults(data, elapsedTime);

    } catch (error) {
        console.error('Error:', error);
        showError(error.message || 'Failed to connect to the server. Make sure the backend is running.');
    } finally {
        // Clear interval and reset button state
        clearInterval(loadingInterval);
        compareBtn.classList.remove('loading');
        btnText.textContent = 'Compare Faces';
        compareBtn.disabled = false;
    }
}

// Display results
function displayResults(data, elapsedTime) {
    const matchPercentage = document.getElementById('match-percentage');
    const matchLevel = document.getElementById('match-level');
    const progressFill = document.getElementById('progress-fill');
    const detailScore = document.getElementById('detail-score');
    const detailDistance = document.getElementById('detail-distance');
    const detailConfidence = document.getElementById('detail-confidence');

    // Animate percentage
    matchPercentage.textContent = `${data.match_percentage}%`;
    matchPercentage.style.background = `linear-gradient(135deg, ${data.match_color}, var(--secondary))`;
    matchPercentage.style.webkitBackgroundClip = 'text';
    matchPercentage.style.webkitTextFillColor = 'transparent';

    // Set match level with processing time
    const modelInfo = data.model ? ` (${data.model})` : '';
    matchLevel.textContent = `${data.match_level}${modelInfo}`;
    matchLevel.style.color = data.match_color;

    // Show processing time if available
    if (elapsedTime) {
        const timeNote = document.createElement('div');
        timeNote.style.fontSize = '0.9rem';
        timeNote.style.color = 'var(--text-secondary)';
        timeNote.style.marginTop = '0.5rem';
        timeNote.textContent = `Processed in ${elapsedTime}s`;

        // Remove old time note if exists
        const oldNote = matchLevel.parentElement.querySelector('.time-note');
        if (oldNote) oldNote.remove();

        timeNote.className = 'time-note';
        matchLevel.parentElement.appendChild(timeNote);
    }

    // Animate progress bar
    setTimeout(() => {
        progressFill.style.width = `${data.match_percentage}%`;
    }, 100);

    // Set details
    detailScore.textContent = `${data.match_percentage}%`;
    detailDistance.textContent = data.distance;

    // Set confidence level
    if (data.match_percentage >= 70) {
        detailConfidence.textContent = 'High';
        detailConfidence.style.color = 'var(--success)';
    } else if (data.match_percentage >= 50) {
        detailConfidence.textContent = 'Medium';
        detailConfidence.style.color = 'var(--warning)';
    } else {
        detailConfidence.textContent = 'Low';
        detailConfidence.style.color = 'var(--danger)';
    }

    // Show results section
    resultsSection.classList.add('active');

    // Scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('active');
}

// Hide error message
function hideError() {
    errorMessage.classList.remove('active');
}

// Hide results
function hideResults() {
    resultsSection.classList.remove('active');
}

// Initialize
initUploadZone(uploadZone1, fileInput1, preview1, previewImg1, 1);
initUploadZone(uploadZone2, fileInput2, preview2, previewImg2, 2);

// Remove button handlers
removeBtn1.addEventListener('click', (e) => {
    e.stopPropagation();
    removeImage(1, preview1, uploadZone1, fileInput1);
});

removeBtn2.addEventListener('click', (e) => {
    e.stopPropagation();
    removeImage(2, preview2, uploadZone2, fileInput2);
});

// Compare button handler
compareBtn.addEventListener('click', compareFaces);

// Check backend health on load
async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_URL}/api/health`);
        if (response.ok) {
            console.log('✅ Backend is running');
        }
    } catch (error) {
        console.warn('⚠️ Backend is not running. Please start the Flask server.');
    }
}

checkBackendHealth();
