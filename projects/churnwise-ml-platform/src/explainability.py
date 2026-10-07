import numpy as np

class ChurnExplainabilityEngine:
    """
    Computes feature importance attribution and heuristic SHAP value breakdowns
    for customer churn prediction features.
    """
    def __init__(self):
        self.feature_weights = {
            "contract_month_to_month": 0.35,
            "tenure_less_than_12": 0.25,
            "tech_support_no": 0.15,
            "monthly_charges_high": 0.15,
            "internet_fiber_optic": 0.10
        }

    def explain_prediction(self, sample_dict):
        tenure = sample_dict.get("tenure", 12)
        contract = sample_dict.get("contract", "month-to-month")
        tech_support = sample_dict.get("tech_support", "No")
        monthly = sample_dict.get("monthly_charges", 70.0)

        shap_values = []
        
        if contract == "month-to-month":
            shap_values.append({"feature": "Contract Type (Month-to-Month)", "impact": "+35%", "direction": "risk_increase"})
        else:
            shap_values.append({"feature": f"Contract Type ({contract})", "impact": "-15%", "direction": "risk_decrease"})

        if tenure < 12:
            shap_values.append({"feature": f"Short Tenure ({tenure} mos)", "impact": "+25%", "direction": "risk_increase"})
        elif tenure > 36:
            shap_values.append({"feature": f"Long Tenure ({tenure} mos)", "impact": "-20%", "direction": "risk_decrease"})

        if tech_support == "No":
            shap_values.append({"feature": "No Tech Support", "impact": "+15%", "direction": "risk_increase"})
        else:
            shap_values.append({"feature": "Has Tech Support", "impact": "-10%", "direction": "risk_decrease"})

        if monthly > 80.0:
            shap_values.append({"feature": f"High Monthly Charges (${monthly})", "impact": "+15%", "direction": "risk_increase"})

        return {
            "top_drivers": shap_values,
            "base_value": 0.25
        }

if __name__ == "__main__":
    explainer = ChurnExplainabilityEngine()
    sample = {"tenure": 4, "contract": "month-to-month", "tech_support": "No", "monthly_charges": 95.0}
    exp = explainer.explain_prediction(sample)
    print("SHAP Feature Importance Explanation:", exp)
