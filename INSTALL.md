# Installation Guide

## System Requirements

- **Python 3.8+** 
- **CMake** (required for dlib/face_recognition)
- Modern web browser

## Step-by-Step Installation

### 1. Install CMake

CMake is required to build the `dlib` library which powers face recognition.

**macOS:**
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install CMake
brew install cmake
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install cmake build-essential
```

**Linux (RedHat/CentOS):**
```bash
sudo yum install cmake gcc gcc-c++
```

**Windows:**
- Download CMake from https://cmake.org/download/
- Run the installer and select "Add CMake to system PATH"

### 2. Verify CMake Installation

```bash
cmake --version
```

You should see the CMake version number.

### 3. Install Python Dependencies

```bash
cd /Users/macbookairm2/.gemini/antigravity/scratch/face-matcher/backend

# Using pip3
pip3 install -r requirements.txt

# Or using pip
pip install -r requirements.txt
```

**Note:** The installation may take several minutes as it compiles dlib from source.

### 4. Start the Backend Server

```bash
cd /Users/macbookairm2/.gemini/antigravity/scratch/face-matcher/backend
python3 app.py
```

You should see:
```
🚀 Face Matching API Server Starting...
📍 Server running on http://localhost:5000
🔍 Ready to compare faces!
```

### 5. Open the Frontend

**Option A - Direct File:**
Simply open `frontend/index.html` in your browser

**Option B - Local Server (Recommended):**
```bash
cd /Users/macbookairm2/.gemini/antigravity/scratch/face-matcher/frontend
python3 -m http.server 8000
```

Then visit: http://localhost:8000

## Testing the Application

Test images are provided in the project root:
- `test_person_1.png` - First test image
- `test_person_2.png` - Different person
- `test_person_1_alt.png` - Same person as test_person_1 (should show high match)

### Test Cases:

1. **High Match Test:**
   - Upload `test_person_1.png` and `test_person_1_alt.png`
   - Expected: 70%+ match (Excellent Match)

2. **Low Match Test:**
   - Upload `test_person_1.png` and `test_person_2.png`
   - Expected: <50% match (Low/Moderate Match)

## Troubleshooting

### CMake Not Found
```
Error: CMake is not installed
```
**Solution:** Follow Step 1 to install CMake

### dlib Installation Fails
```
ERROR: Failed building wheel for dlib
```
**Solution:** 
1. Ensure CMake is installed and in PATH
2. On macOS, install Xcode Command Line Tools: `xcode-select --install`
3. Try upgrading pip: `pip3 install --upgrade pip`

### Port Already in Use
```
Error: Address already in use
```
**Solution:** Change the port in `backend/app.py` (last line):
```python
app.run(debug=True, port=5001)  # Change to different port
```

### CORS Errors in Browser
**Solution:** Make sure:
1. Backend is running on port 5000
2. Check browser console for exact error
3. Verify `flask-cors` is installed

### No Face Detected
**Solution:**
- Use clear, front-facing photos
- Ensure good lighting
- One face per image
- Face should be clearly visible

## Quick Start Script

Save this as `start.sh` in the project root:

```bash
#!/bin/bash

# Start backend in background
cd backend
python3 app.py &
BACKEND_PID=$!

# Start frontend server
cd ../frontend
python3 -m http.server 8000 &
FRONTEND_PID=$!

echo "✅ Backend running on http://localhost:5000"
echo "✅ Frontend running on http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
```

Make it executable:
```bash
chmod +x start.sh
./start.sh
```
