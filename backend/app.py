from flask import Flask, request, jsonify
from flask_cors import CORS
from deepface import DeepFace
import base64
import io
import numpy as np
from PIL import Image
import tempfile
import os

app = Flask(__name__)
CORS(app)

def process_image_to_file(image_data):
    """Process base64 image data and save to temporary file"""
    try:
        # Remove data URL prefix if present
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        # Decode base64 image
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Save to temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
        image.save(temp_file.name, 'JPEG')
        temp_file.close()
        
        return temp_file.name, None
    
    except Exception as e:
        return None, f"Error processing image: {str(e)}"

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Face matching API is running with DeepFace AI'
    })

@app.route('/api/compare', methods=['POST'])
def compare_faces():
    """Compare two face images using DeepFace AI and return match percentage"""
    temp_file1 = None
    temp_file2 = None
    
    try:
        data = request.get_json()
        
        if not data or 'image1' not in data or 'image2' not in data:
            return jsonify({
                'error': 'Both image1 and image2 are required'
            }), 400
        
        # Process first image
        temp_file1, error1 = process_image_to_file(data['image1'])
        if error1:
            return jsonify({
                'error': f'Image 1: {error1}'
            }), 400
        
        # Process second image
        temp_file2, error2 = process_image_to_file(data['image2'])
        if error2:
            if temp_file1 and os.path.exists(temp_file1):
                os.unlink(temp_file1)
            return jsonify({
                'error': f'Image 2: {error2}'
            }), 400
        
        # Use DeepFace to verify faces
        # Using Facenet512 - smaller and faster than VGG-Face
        result = DeepFace.verify(
            img1_path=temp_file1,
            img2_path=temp_file2,
            model_name='Facenet512',  # Faster model, smaller download
            detector_backend='opencv',
            enforce_detection=True
        )
        
        # Extract results
        distance = result['distance']
        verified = result['verified']
        threshold = result['threshold']
        
        # Calculate match percentage
        # Lower distance = higher similarity
        # Convert distance to percentage (0-100)
        if distance <= threshold:
            # High match - scale from threshold to 0
            match_percentage = 100 - (distance / threshold) * 30
        else:
            # Low match - scale from threshold to max distance
            max_distance = threshold * 3
            match_percentage = max(0, 70 - ((distance - threshold) / (max_distance - threshold)) * 70)
        
        match_percentage = round(match_percentage, 2)
        
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
            'distance': round(distance, 4),
            'verified': verified,
            'threshold': round(threshold, 4),
            'match_level': match_level,
            'match_color': match_color,
            'message': f'Faces analyzed successfully using DeepFace AI',
            'model': 'Facenet512'
        })
    
    except ValueError as e:
        error_msg = str(e)
        if 'Face could not be detected' in error_msg:
            return jsonify({
                'error': 'No face detected in one or both images. Please use clear photos with visible faces.'
            }), 400
        else:
            return jsonify({
                'error': f'Face detection error: {error_msg}'
            }), 400
    
    except Exception as e:
        return jsonify({
            'error': f'Server error: {str(e)}'
        }), 500
    
    finally:
        # Clean up temporary files
        if temp_file1 and os.path.exists(temp_file1):
            try:
                os.unlink(temp_file1)
            except:
                pass
        if temp_file2 and os.path.exists(temp_file2):
            try:
                os.unlink(temp_file2)
            except:
                pass

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('FLASK_ENV', 'development') == 'development'
    
    print("🚀 Face Matching API Server Starting...")
    print("🤖 Using DeepFace AI with Facenet512 model")
    print(f"📍 Server running on port {port}")
    print("🔍 Ready to compare faces with real AI!")
    print("")
    print("⚡ First request downloads model (~90MB) - takes 30-60 seconds")
    print("   After that, matching is fast (1-2 seconds per comparison)")
    app.run(debug=debug, host='0.0.0.0', port=port)
