import unittest
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.ats_engine import ATSEngine
from src.pdf_parser import PDFResumeParser

class TestAtsEngine(unittest.TestCase):
    def setUp(self):
        self.ats = ATSEngine()
        self.parser = PDFResumeParser()

    def test_calculate_match_score(self):
        resume = "B.Tech CSE student proficient in Python, OpenCV, Pandas, NumPy, Scikit-learn, FastAPI, and HTML/CSS."
        jd = "Seeking an AI Engineer skilled in Python, Machine Learning model building, PyTorch, SQL, REST APIs, and Data Pipelines."
        result = self.ats.calculate_match_score(resume, jd)
        self.assertIn("match_score", result)
        self.assertGreaterEqual(result["match_score"], 0.0)
        self.assertIn("matched_keywords", result)
        self.assertIn("missing_keywords", result)

    def test_skill_extraction(self):
        text = "Skilled in Python, Java, SQL, React, and FastAPI."
        skills = self.parser.extract_skills(text)
        self.assertIn("python", skills)
        self.assertIn("fastapi", skills)

if __name__ == "__main__":
    unittest.main()
