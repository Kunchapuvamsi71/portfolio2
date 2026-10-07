# Activity Performance Monitor

An end-to-end real-time Computer Vision & Analytics application built with **Python**, **OpenCV**, **Pandas**, **NumPy**, **Matplotlib**, and **Flask**.

## 📌 Architecture Overview

```
activity-performance-monitor/
├── src/
│   ├── __init__.py
│   ├── vision_pipeline.py     # HOG feature extractor & frame classifier
│   └── analytics.py           # Pandas time-series logger & Matplotlib chart generator
├── app.py                     # Flask REST API server
├── requirements.txt           # Dependency requirements
└── README.md                  # Setup & execution guide
```

## ⚡ Features

* **Feature Extraction:** Calculates gradient magnitude & HOG feature energy vectors from video frames using OpenCV.
* **Heuristic Activity Classification:** Classifies movement energy into `WORKING`, `WALKING`, `RUNNING`, or `SITTING` states.
* **Time-Series Analytics:** Logs data with Pandas and renders multi-panel visual analytics charts with Matplotlib.
* **REST API:** Provides endpoints for frame processing and analytics retrieval.

## 🚀 Quick Setup & Run Instructions

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Test Vision Pipeline
python src/vision_pipeline.py

# 3. Test Analytics Report Generator
python src/analytics.py

# 4. Run Flask Web Server
python app.py
```
