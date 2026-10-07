import os
import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
import joblib

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.data_loader import ChurnDataLoader
from src.model import ChurnModelFactory
from data.generate_dataset import generate_telco_churn_dataset

def run_training_pipeline(data_path="data/churn_data.csv", model_output="models/model.joblib"):
    os.makedirs(os.path.dirname(data_path), exist_ok=True)
    os.makedirs(os.path.dirname(model_output), exist_ok=True)

    if not os.path.exists(data_path):
        df = generate_telco_churn_dataset(output_path=data_path)
    else:
        loader = ChurnDataLoader()
        df = loader.load_raw_data(data_path)

    X = df.drop(columns=["customer_id", "churn"])
    y = df["churn"]

    loader = ChurnDataLoader()
    preprocessor = loader.build_preprocessor()
    pipeline = ChurnModelFactory.create_pipeline(preprocessor)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    y_proba = pipeline.predict_proba(X_test)[:, 1]

    auc = roc_auc_score(y_test, y_proba)
    print("=== ChurnWise 2.0 Model Training Results ===")
    print(f"ROC-AUC Score: {auc:.4f}")
    print("\nClassification Report:\n", classification_report(y_test, y_pred))

    joblib.dump(pipeline, model_output)
    print(f"Trained ML Pipeline successfully saved to {model_output}")
    return pipeline

if __name__ == "__main__":
    run_training_pipeline()
