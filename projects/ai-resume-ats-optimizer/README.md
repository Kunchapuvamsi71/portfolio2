# AI Resume ATS & Skill Gap Optimizer

FastAPI-powered semantic ATS parser and resume tailoring engine built with **Python**, **FastAPI**, **PyPDF2**, **Scikit-Learn**, and **Google Gemini API**.

## 📌 Architecture Overview

```
ai-resume-ats-optimizer/
├── src/
│   ├── __init__.py
│   ├── pdf_parser.py          # PyPDF2 PDF text & skill extractor
│   ├── ats_engine.py          # Scikit-learn TF-IDF & Cosine Similarity matcher
│   └── gemini_advisor.py      # Google Gemini API resume bullet optimizer
├── main.py                    # FastAPI REST server & Swagger UI docs
├── requirements.txt           # Dependency requirements
└── README.md                  # Setup & execution guide
```

## ⚡ Features

* **PDF Resume Extraction:** Extracts clean text and skill lists from uploaded PDF resumes.
* **Semantic ATS Scoring:** Calculates exact match percentage using TF-IDF Vectorization & Cosine Similarity.
* **Skill Gap Analysis:** Extracts matched keywords vs missing required job description terms.
* **AI Tailoring Recommendations:** Generates action-verb bullet improvements using Google Gemini AI.

## 🚀 Quick Setup & Run Instructions

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Test PDF Parser
python src/pdf_parser.py

# 3. Test ATS Scoring Engine
python src/ats_engine.py

# 4. Launch FastAPI Server & Open Swagger UI
python main.py
# Open browser at: http://localhost:8000/docs
```
