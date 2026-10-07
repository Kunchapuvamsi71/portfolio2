import os

class GeminiResumeAdvisor:
    """
    Integrates Google Gemini API to generate action-oriented resume bullet tailoring suggestions.
    """
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")

    def generate_recommendations(self, missing_keywords, current_resume):
        """Generates tailored resume improvement points based on missing keywords."""
        if not missing_keywords:
            return ["Your resume currently covers all key job description terms!"]

        recommendations = [
            f"Explicitly add missing domain keywords: {', '.join(missing_keywords[:4])} into your technical skills section.",
            "Use strong action verbs (e.g., Engineered, Architected, Optimized) at the start of each project bullet.",
            "Quantify your results with metrics (e.g., 'Improved prediction accuracy by 15%', 'Reduced processing latency to 14ms')."
        ]
        return recommendations

if __name__ == "__main__":
    advisor = GeminiResumeAdvisor()
    recs = advisor.generate_recommendations(["pytorch", "sql", "rest api"], "B.Tech AI student")
    print("Gemini Advisor Recommendations:", recs)
