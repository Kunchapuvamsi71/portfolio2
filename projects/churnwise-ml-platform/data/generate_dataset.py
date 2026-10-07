import pandas as pd
import numpy as np
import os

def generate_telco_churn_dataset(n_samples=1000, output_path="churn_data.csv"):
    np.random.seed(42)
    
    tenure = np.random.randint(1, 72, size=n_samples)
    monthly_charges = np.random.uniform(20.0, 120.0, size=n_samples)
    contract = np.random.choice(["month-to-month", "one-year", "two-year"], size=n_samples, p=[0.55, 0.25, 0.20])
    tech_support = np.random.choice(["Yes", "No"], size=n_samples, p=[0.35, 0.65])
    internet_service = np.random.choice(["Fiber Optic", "DSL", "None"], size=n_samples, p=[0.45, 0.40, 0.15])
    
    # Calculate churn probability based on domain rules
    churn_prob = (
        0.25 + 
        (contract == "month-to-month") * 0.30 +
        (tenure < 12) * 0.20 -
        (tenure > 36) * 0.25 +
        (tech_support == "No") * 0.15 +
        (monthly_charges > 85) * 0.10
    )
    churn_prob = np.clip(churn_prob, 0.05, 0.95)
    churn = np.random.binomial(1, churn_prob)
    
    df = pd.DataFrame({
        "customer_id": [f"CUST-{i:04d}" for i in range(1, n_samples + 1)],
        "tenure": tenure,
        "monthly_charges": np.round(monthly_charges, 2),
        "contract": contract,
        "tech_support": tech_support,
        "internet_service": internet_service,
        "churn": churn
    })
    
    df.to_csv(output_path, index=False)
    print(f"Generated Telco Churn Dataset with {n_samples} samples at {output_path}")
    return df

if __name__ == "__main__":
    generate_telco_churn_dataset()
