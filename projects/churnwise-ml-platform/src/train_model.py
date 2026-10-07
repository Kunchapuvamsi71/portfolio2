import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
import joblib
import os
import sys

# Ensure dataset exists
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from data.generate_dataset import generate_telco_churn_dataset

def train_and_save_model(data_path="churn_data.csv", model_output="model.joblib"):
    if not os.path.exists(data_path):
        df = generate_telco_churn_dataset(output_path=data_path)
    else:
        df = pd.read_csv(data_path)
        
    X = df.drop(columns=["customer_id", "churn"])
    y = df["churn"]
    
    num_cols = ["tenure", "monthly_charges"]
    cat_cols = ["contract", "tech_support", "internet_service"]
    
    preprocessor = ColumnTransformer(transformers=[
        ("num", StandardScaler(), num_cols),
        ("cat", OneHotEncoder(drop="first", sparse_output=False), cat_cols)
    ])
    
    pipeline = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("classifier", RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42))
    ])
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    pipeline.fit(X_train, y_train)
    
    y_pred = pipeline.predict(X_test)
    y_proba = pipeline.predict_proba(X_test)[:, 1]
    
    auc = roc_auc_score(y_test, y_proba)
    print("=== ChurnWise 2.0 Model Training Results ===")
    print(f"ROC-AUC Score: {auc:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    joblib.dump(pipeline, model_output)
    print(f"Trained ML Pipeline successfully saved to {model_output}")
    return pipeline

if __name__ == "__main__":
    train_and_save_model()
