# ChurnWise 2.0 ML Platform

Production-grade Customer Churn Prediction & Model Explainability Engine built with **Python**, **Scikit-Learn**, **XGBoost**, **Pandas**, **Joblib**, and **Flask**.

## 📌 Production Directory Layout

```
churnwise-ml-platform/
├── data/                      # Data pipeline & dataset generator
│   └── generate_dataset.py
├── src/                       # Production source code modules
│   ├── __init__.py
│   ├── data_loader.py         # Data loading & ColumnTransformer preprocessing
│   ├── model.py               # Random Forest / XGBoost model architecture
│   ├── train.py               # Training pipeline & evaluation metrics
│   ├── inference.py           # Model scoring & inference engine
│   └── explainability.py      # SHAP feature attribution calculation engine
├── models/                    # Trained model binary weights
│   └── model.joblib
├── tests/                     # Automated unit testing suite
│   └── test_model.py
├── app.py                     # Flask REST prediction API
├── requirements.txt           # Python dependency specifications
├── .gitignore
└── README.md                  # Comprehensive setup & API reference
```

## 🚀 Quick Setup & Run Instructions

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run Training Pipeline & Save Model Binary
python src/train.py

# 3. Run Unit Test Suite
python -m unittest discover tests

# 4. Start Flask REST API Server
python app.py
```
