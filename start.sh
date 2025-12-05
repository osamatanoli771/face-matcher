#!/bin/bash

echo "🚀 Starting Face Matcher Application..."
echo ""

# Check if CMake is installed
if ! command -v cmake &> /dev/null; then
    echo "❌ CMake is not installed!"
    echo "Please install CMake first:"
    echo "  macOS: brew install cmake"
    echo "  Linux: sudo apt-get install cmake"
    echo ""
    echo "See INSTALL.md for detailed instructions"
    exit 1
fi

# Check if Python dependencies are installed
if ! python3 -c "import flask" &> /dev/null; then
    echo "📦 Installing Python dependencies..."
    cd backend
    pip3 install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        echo "See INSTALL.md for troubleshooting"
        exit 1
    fi
    cd ..
fi

# Start backend in background
echo "🔧 Starting backend server..."
cd backend
python3 app.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend server
echo "🌐 Starting frontend server..."
cd frontend
python3 -m http.server 8000 &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Face Matcher is running!"
echo ""
echo "📍 Backend API: http://localhost:5001"
echo "📍 Frontend UI: http://localhost:8000"
echo ""
echo "🎯 Open http://localhost:8000 in your browser"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
