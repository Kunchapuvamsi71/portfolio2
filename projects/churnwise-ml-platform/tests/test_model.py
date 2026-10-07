import unittest
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.data_loader import ChurnDataLoader
from src.inference import ChurnPredictor

class TestChurnWiseML(unittest.TestCase):
    def test_data_loader_build(self):
        loader = ChurnDataLoader()
        prep = loader.build_preprocessor()
        self.assertIsNotNone(prep)

    def test_inference_engine(self):
        predictor = ChurnPredictor(model_path="models/model.joblib")
        sample = {
            "tenure": 12,
            "monthly_charges": 85.0,
            "contract": "month-to-month",
            "tech_support": "No",
            "internet_service": "Fiber Optic"
        }
        res = predictor.predict_sample(sample)
        self.assertIn("probability", res)
        self.assertIn("risk_category", res)
        self.assertGreaterEqual(res["probability"], 0.0)
        self.assertLessEqual(res["probability"], 1.0)

if __name__ == "__main__":
    unittest.main()
