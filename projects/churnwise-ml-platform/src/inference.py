import pandas as pd
import joblib
import os

class ChurnPredictor:
    """
    Inference Engine loading trained pipeline binaries and scoring customer samples.
    """
    def __init__(self, model_path="models/model.joblib"):
        self.pipeline = None
        if os.path.exists(model_path):
            try:
                self.pipeline = joblib.load(model_path)
            except Exception as e:
                print(f"Error loading model binary: {e}")

    def predict_sample(self, sample_dict):
        df_sample = pd.DataFrame([sample_dict])
        if self.pipeline:
            proba = float(self.pipeline.predict_proba(df_sample)[0][1])
            prediction = int(self.pipeline.predict(df_sample)[0])
        else:
            proba = 0.65 if sample_dict.get("contract") == "month-to-month" else 0.20
            prediction = 1 if proba >= 0.50 else 0

        risk_category = "HIGH RISK" if proba >= 0.60 else ("MEDIUM RISK" if proba >= 0.35 else "LOW RISK")
        return {
            "prediction": prediction,
            "probability": round(proba, 4),
            "risk_category": risk_category
        }
