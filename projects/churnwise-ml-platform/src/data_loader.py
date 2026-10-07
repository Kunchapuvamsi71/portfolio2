import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer

class ChurnDataLoader:
    """
    Data Preprocessing & Feature Engineering Pipeline for ChurnWise 2.0.
    """
    def __init__(self):
        self.num_cols = ["tenure", "monthly_charges"]
        self.cat_cols = ["contract", "tech_support", "internet_service"]

    def build_preprocessor(self):
        preprocessor = ColumnTransformer(transformers=[
            ("num", StandardScaler(), self.num_cols),
            ("cat", OneHotEncoder(drop="first", sparse_output=False), self.cat_cols)
        ])
        return preprocessor

    def load_raw_data(self, filepath):
        df = pd.read_csv(filepath)
        return df
