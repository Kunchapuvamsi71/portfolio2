from flask import Flask, jsonify, request
import pandas as pd
import joblib
import os
from src.explainability import ChurnExplainabilityEngine

app = Flask(__name__)
explainer = ChurnExplainabilityEngine()
MODEL_PATH = "model.joblib"

pipeline = None
if os.path.exists(MODEL_PATH):
    try:
        pipeline = joblib.load(MODEL_PATH)
        print(f"Loaded trained ML Pipeline from {MODEL_PATH}")
    except Exception as e:
        print(f"Could not load model file: {e}")

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "module": "ChurnWise 2.0 ML REST API", "model_loaded": pipeline is not None})

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json() or {}
    sample = {
        "tenure": int(data.get("tenure", 12)),
        "monthly_charges": float(data.get("monthly_charges", 75.0)),
        "contract": data.get("contract", "month-to-month"),
        "tech_support": data.get("tech_support", "No"),
        "internet_service": data.get("internet_service", "Fiber Optic")
    }

    if pipeline:
        df_sample = pd.DataFrame([sample])
        proba = float(pipeline.predict_proba(df_sample)[0][1])
        prediction = int(pipeline.predict(df_sample)[0])
    else:
        # Heuristic fallback if model not pre-trained
        proba = 0.65 if sample["contract"] == "month-to-month" else 0.20
        prediction = 1 if proba >= 0.50 else 0

    explanation = explainer.explain_prediction(sample)

    return jsonify({
        "churn_prediction": prediction,
        "churn_probability": round(proba, 4),
        "risk_category": "HIGH RISK" if proba >= 0.60 else ("MEDIUM RISK" if proba >= 0.35 else "LOW RISK"),
        "explanation": explanation
    })

if __name__ == "__main__":
    print("Starting ChurnWise 2.0 Flask REST Server on port 5002...")
    app.run(host="0.0.0.0", port=5002, debug=True)
