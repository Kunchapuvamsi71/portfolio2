import unittest
import numpy as np
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.vision_pipeline import ActivityClassifier
from src.analytics import ActivityAnalytics

class TestActivityVision(unittest.TestCase):
    def setUp(self):
        self.classifier = ActivityClassifier()
        self.analytics = ActivityAnalytics()

    def test_classify_dummy_frame(self):
        dummy_frame = np.random.randint(0, 255, (480, 640, 3), dtype=np.uint8)
        res = self.classifier.classify_frame(dummy_frame)
        self.assertIn("activity", res)
        self.assertIn("confidence", res)
        self.assertIn("feature_vector_energy", res)
        self.assertGreater(res["confidence"], 0.0)

    def test_analytics_logging(self):
        self.analytics.log_entry("WORKING", 98.4, 45000.0, 1000.0)
        df = self.analytics.get_dataframe()
        self.assertEqual(len(df), 1)
        self.assertEqual(df["activity"].iloc[0], "WORKING")

if __name__ == "__main__":
    unittest.main()
