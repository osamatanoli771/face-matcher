from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Face matching API is running (DEMO MODE - Install face_recognition for real matching)'
    })

@app.route('/api/compare', methods=['POST'])
def compare_faces():
    """
    DEMO VERSION - Returns simulated results
    To use real face recognition, install: brew install cmake && pip3 install face_recognition
    Then replace this file with backend/app.py
    """
    try:
        data = request.get_json()
        
        if not data or 'image1' not in data or 'image2' not in data:
            return jsonify({
                'error': 'Both image1 and image2 are required'
            }), 400
        
        # Simulate face matching with random but realistic results
        # In real version, this would use face_recognition library
        match_percentage = round(random.uniform(30, 95), 2)
        distance = round((100 - match_percentage) / 100, 4)
        
        # Determine match level
        if match_percentage >= 70:
            match_level = "Excellent Match"
            match_color = "#00ff88"
        elif match_percentage >= 50:
            match_level = "Good Match"
            match_color = "#ffaa00"
        elif match_percentage >= 30:
            match_level = "Moderate Match"
            match_color = "#ff6600"
        else:
            match_level = "Low Match"
            match_color = "#ff3366"
        
        return jsonify({
            'success': True,
            'match_percentage': match_percentage,
            'distance': distance,
            'match_level': match_level,
            'match_color': match_color,
            'message': '⚠️ DEMO MODE - Results are simulated. Install face_recognition for real AI matching.',
            'demo_mode': True
        })
    
    except Exception as e:
        return jsonify({
            'error': f'Server error: {str(e)}'
        }), 500

if __name__ == '__main__':
    print("🚀 Face Matching API Server Starting...")
    print("⚠️  DEMO MODE - Using simulated results")
    print("📍 Server running on http://localhost:5001")
    print("")
    print("To enable real face recognition:")
    print("  1. Install Homebrew: /bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"")
    print("  2. Install CMake: brew install cmake")
    print("  3. Install face_recognition: pip3 install face_recognition")
    print("  4. Replace app_demo.py with app.py")
    print("")
    print("🔍 Ready to compare faces (demo mode)!")
    app.run(debug=True, port=5001)
