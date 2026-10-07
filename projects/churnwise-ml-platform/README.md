# ChurnWise 2.0 ML Platform

End-to-End Customer Churn Prediction & Model Explainability System built with **Python**, **Scikit-Learn**, **XGBoost**, **Pandas**, **Joblib**, and **Flask**.

## 📌 Architecture Overview

```
churnwise-ml-platform/
├── data/
│   └── generate_dataset.py    # Synthetic telco dataset generator
├── src/
│   ├── __init__.py
│   ├── train_model.py         # Scikit-learn Random Forest/XGBoost training pipeline
│   └── explainability.py      # Feature attribution & SHAP explainer engine
├── app.py                     # Flask REST prediction API
├── requirements.txt           # Dependency requirements
└── README.md                  # Model training & API documentation
```

## ⚡ Features

* **Dataset Generation:** Synthesizes multi-feature telco customer profiles.
* **Pre-processing & Pipeline:** `ColumnTransformer` with `StandardScaler` and `OneHotEncoder`.
* **Model Training:** Random Forest Classifier with ROC-AUC evaluation and `.joblib` pipeline serialization.
* **Feature Explainability:** Attribution engine breaking down top risk drivers per prediction.
* **REST API:** `/api/predict` endpoint for single/batch inference.

## 🚀 Quick Setup & Run Instructions

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Generate Dataset & Train Model
python src/train_model.py

# 3. Test Explainability Engine
python src/explainability.py

# 4. Launch REST Prediction Server
python app.py
```
