# AI Resume ATS & Skill Gap Optimizer

FastAPI-powered semantic ATS parser and resume tailoring engine built with **Python**, **FastAPI**, **PyPDF2**, **Scikit-Learn**, and **Google Gemini API**.

## 📌 Production Directory Layout

```
ai-resume-ats-optimizer/
├── data/                      # Sample text & PDF resume test cases
│   └── sample_resumes/
├── src/                       # Production source code modules
│   ├── __init__.py
│   ├── pdf_parser.py          # PyPDF2 PDF text & skill extractor
│   ├── ats_engine.py          # Scikit-learn TF-IDF & Cosine Similarity matcher
│   └── gemini_advisor.py      # Google Gemini API resume bullet optimizer
├── tests/                     # Automated unit testing suite
│   └── test_ats_engine.py
├── main.py                    # FastAPI REST server & Swagger UI docs
├── requirements.txt           # Dependency specifications
├── .gitignore
└── README.md                  # Comprehensive setup & API reference
```

## 🚀 Quick Setup & Run Instructions

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run Automated Unit Test Suite
python -m unittest discover tests

# 3. Launch FastAPI Server & Open Swagger UI
python main.py
# Open browser at: http://localhost:8000/docs
```
