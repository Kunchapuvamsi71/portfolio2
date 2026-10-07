from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from src.pdf_parser import PDFResumeParser
from src.ats_engine import ATSEngine
from src.gemini_advisor import GeminiResumeAdvisor

app = FastAPI(title="AI Resume ATS & Skill Gap Optimizer API", version="1.0.0")

ats_engine = ATSEngine()
advisor = GeminiResumeAdvisor()

class ATSRequest(BaseModel):
    resume_text: str
    job_description: str

class ATSResponse(BaseModel):
    match_score: float
    matched_keywords: List[str]
    missing_keywords: List[str]
    recommendations: List[str]

@app.get("/")
def root():
    return {"message": "AI Resume ATS Optimizer API is active", "docs": "/docs"}

@app.post("/api/analyze-ats", response_model=ATSResponse)
def analyze_ats(payload: ATSRequest):
    if not payload.resume_text or not payload.job_description:
        raise HTTPException(status_code=400, detail="Both resume_text and job_description must be provided.")

    ats_res = ats_engine.calculate_match_score(payload.resume_text, payload.job_description)
    recs = advisor.generate_recommendations(ats_res["missing_keywords"], payload.resume_text)

    return ATSResponse(
        match_score=ats_res["match_score"],
        matched_keywords=ats_res["matched_keywords"],
        missing_keywords=ats_res["missing_keywords"],
        recommendations=recs
    )

if __name__ == "__main__":
    import uvicorn
    print("Starting FastAPI ATS Server on port 8000...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
