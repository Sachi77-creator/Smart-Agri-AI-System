from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# AI Model Logic (Mocking a Machine Learning Crop Recommendation Model)
def get_crop_recommendation(n, p, k, ph):
    # Logic simulating a trained AI model
    if n > 70 and p > 50 and k > 40:
        return "Rice"
    elif n < 30 and p > 60 and ph < 6:
        return "Tea or Coffee"
    elif ph > 7 and k > 50:
        return "Cotton"
    elif n > 100:
        return "Maize (Corn)"
    else:
        return "Pulses / Beans"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        # Extract values from React frontend
        n = int(data.get('n', 0))
        p = int(data.get('p', 0))
        k = int(data.get('k', 0))
        ph = float(data.get('ph', 6.5))
        
        crop = get_crop_recommendation(n, p, k, ph)
        return jsonify({"recommended_crop": crop, "status": "Success"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)