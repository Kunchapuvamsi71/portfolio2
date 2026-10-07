from flask import Flask, jsonify, request
from src.vision_pipeline import ActivityClassifier
from src.analytics import ActivityAnalytics
import numpy as np
import time

app = Flask(__name__)
classifier = ActivityClassifier()
analytics = ActivityAnalytics()

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "module": "Activity Performance Monitor CV Engine", "version": "1.0.0"})

@app.route("/api/process-frame", methods=["POST"])
def process_frame():
    """Processes a simulated frame array or raw values."""
    dummy_frame = np.random.randint(0, 255, (480, 640, 3), dtype=np.uint8)
    res = classifier.classify_frame(dummy_frame)
    analytics.log_entry(res["activity"], res["confidence"], res["feature_vector_energy"], res["timestamp"])
    return jsonify({"success": True, "data": res})

@app.route("/api/analytics-summary", methods=["GET"])
def analytics_summary():
    df = analytics.get_dataframe()
    if df.empty:
        return jsonify({"summary": "No data logged yet", "total_frames": 0})
    
    counts = df["activity"].value_counts().to_dict()
    avg_conf = float(df["confidence"].mean())
    avg_energy = float(df["energy"].mean())
    return jsonify({
        "total_frames_processed": len(df),
        "activity_counts": counts,
        "average_confidence": round(avg_conf, 2),
        "average_energy": round(avg_energy, 2)
    })

if __name__ == "__main__":
    print("Starting Activity Performance Monitor Flask Server on port 5001...")
    app.run(host="0.0.0.0", port=5001, debug=True)
