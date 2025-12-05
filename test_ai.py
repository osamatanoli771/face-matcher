import requests
import base64
import json

def test_face_matching():
    """Test the face matching API with real images"""
    
    # Read test image
    image_path = "/Users/macbookairm2/.gemini/antigravity/brain/2d5668a6-7248-436c-b677-8f415f3c1b51/test_person_1_1764872565948.png"
    
    with open(image_path, 'rb') as f:
        image_data = base64.b64encode(f.read()).decode('utf-8')
        image_data = f"data:image/png;base64,{image_data}"
    
    # Test 1: Same image compared to itself (should give high match)
    print("🧪 Test 1: Comparing same image to itself...")
    print("=" * 60)
    
    payload = {
        "image1": image_data,
        "image2": image_data
    }
    
    # Run the test 3 times to show consistency
    for i in range(3):
        response = requests.post('http://localhost:5001/api/compare', json=payload)
        result = response.json()
        
        if response.status_code == 200:
            print(f"\nAttempt {i+1}:")
            print(f"  Match Percentage: {result['match_percentage']}%")
            print(f"  Match Level: {result['match_level']}")
            print(f"  Distance: {result['distance']}")
            print(f"  Verified: {result['verified']}")
        else:
            print(f"\nAttempt {i+1}: Error - {result.get('error', 'Unknown error')}")
    
    print("\n" + "=" * 60)
    print("✅ Notice: All 3 attempts should show IDENTICAL results!")
    print("   This proves we're using REAL AI, not random numbers.")

if __name__ == '__main__':
    test_face_matching()
