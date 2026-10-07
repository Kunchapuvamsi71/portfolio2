# Activity Performance Monitor

Real-Time Computer Vision & Analytics application built with **Python**, **OpenCV**, **Pandas**, **NumPy**, **Matplotlib**, and **Flask**.

## 📌 Production Directory Layout

```
activity-performance-monitor/
├── data/                      # Sample test video frames
│   └── sample_frames/
├── src/                       # Production source code modules
│   ├── __init__.py
│   ├── vision_pipeline.py     # HOG feature energy extractor & frame classifier
│   └── analytics.py           # Pandas time-series logger & Matplotlib plot generator
├── models/                    # Vision classifier binaries
├── tests/                     # Automated unit testing suite
│   └── test_vision.py
├── app.py                     # Flask REST API server
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

# 3. Test Vision Pipeline
python src/vision_pipeline.py

# 4. Start Flask REST API Server
python app.py
```
