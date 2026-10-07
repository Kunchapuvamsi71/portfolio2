import pypdf
import re

class PDFResumeParser:
    """
    Extracts structured text, skills, and sections from PDF resumes using PyPDF2 / pypdf.
    """
    def __init__(self):
        pass

    def extract_text_from_file(self, filepath):
        try:
            reader = pypdf.PdfReader(filepath)
            text = ""
            for page in reader.pages:
                text += (page.extract_text() or "") + "\n"
            return text.strip()
        except Exception as e:
            print(f"Error parsing PDF file {filepath}: {e}")
            return ""

    def extract_skills(self, text):
        common_skills = [
            "python", "c++", "java", "html", "css", "javascript", "react", "flask",
            "fastapi", "sql", "sqlite", "opencv", "pandas", "numpy", "matplotlib",
            "scikit-learn", "tensorflow", "pytorch", "git", "power bi"
        ]
        text_lower = text.lower()
        found_skills = [skill for skill in common_skills if re.search(r'\b' + re.escape(skill) + r'\b', text_lower)]
        return found_skills

if __name__ == "__main__":
    parser = PDFResumeParser()
    sample_text = "B.Tech CSE student skilled in Python, OpenCV, Pandas, NumPy, Scikit-learn, FastAPI, and HTML/CSS."
    skills = parser.extract_skills(sample_text)
    print("Extracted Skills:", skills)
