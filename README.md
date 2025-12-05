# 🎭 Face Matcher - AI Face Comparison Software

A powerful web-based application that uses AI to compare facial features between two people and calculate their similarity percentage.

![Face Matcher](https://img.shields.io/badge/AI-Face%20Recognition-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)
![Flask](https://img.shields.io/badge/Flask-3.0-red)

## ✨ Features

- **AI-Powered Face Recognition** - Uses advanced facial recognition algorithms
- **Real-time Comparison** - Instant face matching results
- **Beautiful UI** - Modern, responsive design with smooth animations
- **Drag & Drop** - Easy image upload with drag-and-drop support
- **Match Percentage** - Detailed similarity score and analysis
- **Face Distance Metrics** - Technical details about face comparison

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Modern web browser

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd /Users/macbookairm2/.gemini/antigravity/scratch/face-matcher
   ```

2. **Install Python dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

   > **Note:** The `face_recognition` library requires `dlib` which may need additional system dependencies:
   > - **macOS:** `brew install cmake`
   > - **Linux:** `sudo apt-get install cmake`

### Running the Application

1. **Start the Backend Server:**
   ```bash
   cd backend
   python app.py
   ```
   
   The server will start on `http://localhost:5000`

2. **Open the Frontend:**
   
   Open `frontend/index.html` in your web browser, or use a local server:
   ```bash
   cd frontend
   python -m http.server 8000
   ```
   
   Then visit `http://localhost:8000`

## 📖 Usage

1. **Upload Images:**
   - Click or drag-and-drop the first person's image in the left upload zone
   - Click or drag-and-drop the second person's image in the right upload zone

2. **Compare Faces:**
   - Click the "Compare Faces" button
   - Wait for the AI to analyze the images

3. **View Results:**
   - See the match percentage (0-100%)
   - Review the match level (Excellent/Good/Moderate/Low)
   - Check detailed metrics including face distance

## 🔧 API Documentation

### Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "message": "Face matching API is running"
}
```

### Compare Faces
```
POST /api/compare
```

**Request Body:**
```json
{
  "image1": "base64_encoded_image_data",
  "image2": "base64_encoded_image_data"
}
```

**Response:**
```json
{
  "success": true,
  "match_percentage": 85.5,
  "distance": 0.145,
  "match_level": "Excellent Match",
  "match_color": "#00ff88",
  "message": "Faces analyzed successfully"
}
```

## 🎨 Technology Stack

### Backend
- **Flask** - Web framework
- **face_recognition** - Face detection and encoding
- **dlib** - Machine learning toolkit
- **NumPy** - Numerical computing
- **Pillow** - Image processing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with glassmorphism effects
- **JavaScript** - Interactive functionality
- **Fetch API** - Backend communication

## 📊 How It Works

1. **Face Detection:** The system detects faces in both uploaded images
2. **Feature Extraction:** Creates 128-dimensional encodings of facial features
3. **Distance Calculation:** Computes Euclidean distance between encodings
4. **Match Percentage:** Converts distance to an intuitive percentage score

**Match Scoring:**
- **70-100%** - Excellent Match (likely same person)
- **50-69%** - Good Match (strong similarity)
- **30-49%** - Moderate Match (some similarity)
- **0-29%** - Low Match (different people)

## 🛡️ Error Handling

The application handles various error cases:
- No face detected in image
- Multiple faces in image
- Invalid image format
- File size too large (>10MB)
- Server connection issues

## 🎯 Project Structure

```
face-matcher/
├── backend/
│   ├── app.py              # Flask API server
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html         # Main HTML page
│   ├── style.css          # Styling
│   └── script.js          # Frontend logic
└── README.md              # This file
```

## 🔒 Privacy & Security

- Images are processed in memory and not stored
- No data is saved to disk
- All processing happens locally on your machine
- No third-party API calls

## 🐛 Troubleshooting

**Backend won't start:**
- Make sure all dependencies are installed: `pip install -r requirements.txt`
- Check if port 5000 is available
- Verify Python version is 3.8+

**"No face detected" error:**
- Ensure the image has a clear, visible face
- Try images with better lighting
- Face should be front-facing

**CORS errors:**
- Make sure the backend is running on port 5000
- Check that CORS is enabled in `app.py`

## 📝 License

This project is open source and available for personal and educational use.

## 🙏 Acknowledgments

- Built with [face_recognition](https://github.com/ageitgey/face_recognition) library
- Powered by dlib's state-of-the-art face recognition

---

**Made with ❤️ using AI and Python**
