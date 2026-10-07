from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

class ATSEngine:
    """
    Computes semantic ATS similarity match scores between resume text and job descriptions
    using TF-IDF Vectorization and Cosine Similarity.
    """
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words="english")

    def clean_text(self, text):
        text = re.sub(r'[^a-zA-Z0-9\s+#.-]', ' ', text.lower())
        return ' '.join(text.split())

    def calculate_match_score(self, resume_text, jd_text):
        cleaned_resume = self.clean_text(resume_text)
        cleaned_jd = self.clean_text(jd_text)

        if not cleaned_resume or not cleaned_jd:
            return {"match_score": 0.0, "matched_keywords": [], "missing_keywords": []}

        tfidf_matrix = self.vectorizer.fit_transform([cleaned_resume, cleaned_jd])
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        match_score = round(float(similarity) * 100, 2)

        # Extract keyword coverage
        feature_names = self.vectorizer.get_feature_names_out()
        resume_vec = tfidf_matrix[0].toarray()[0]
        jd_vec = tfidf_matrix[1].toarray()[0]

        matched = []
        missing = []

        for idx, word in enumerate(feature_names):
            if jd_vec[idx] > 0:
                if resume_vec[idx] > 0:
                    matched.append(word)
                else:
                    missing.append(word)

        return {
            "match_score": match_score,
            "matched_keywords": matched[:15],
            "missing_keywords": missing[:15]
        }

if __name__ == "__main__":
    ats = ATSEngine()
    res = "B.Tech CSE student proficient in Python, OpenCV, Pandas, NumPy, Scikit-learn, FastAPI, and HTML/CSS."
    jd = "Looking for an AI Engineer skilled in Python, Machine Learning model building, PyTorch, SQL, REST APIs, and Data Pipelines."
    result = ats.calculate_match_score(res, jd)
    print("ATS Scoring Result:", result)
