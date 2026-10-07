from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline

class ChurnModelFactory:
    """
    Factory class creating Scikit-Learn & XGBoost ML Pipeline architectures.
    """
    @staticmethod
    def create_pipeline(preprocessor):
        pipeline = Pipeline(steps=[
            ("preprocessor", preprocessor),
            ("classifier", RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42))
        ])
        return pipeline
