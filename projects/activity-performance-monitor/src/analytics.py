import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os

class ActivityAnalytics:
    """
    Time-Series Analytics Engine for logging activity classifications and generating Matplotlib performance reports.
    """
    def __init__(self):
        self.log_data = []

    def log_entry(self, activity, confidence, energy, timestamp):
        self.log_data.append({
            "timestamp": timestamp,
            "activity": activity,
            "confidence": confidence,
            "energy": energy
        })

    def get_dataframe(self):
        return pd.DataFrame(self.log_data)

    def generate_report(self, output_path="activity_report.png"):
        """Generates a multi-panel analytics report chart using Matplotlib."""
        if not self.log_data:
            print("No data logged to generate report.")
            return False

        df = self.get_dataframe()
        fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 6), sharex=True)

        # Plot Activity Energy Over Time
        ax1.plot(df.index, df["energy"], color="#10b981", linewidth=2, label="Feature Vector Energy")
        ax1.set_ylabel("Energy Magnitude")
        ax1.set_title("Real-Time Activity Performance Analytics Report", fontsize=14, fontweight="bold")
        ax1.grid(True, linestyle="--", alpha=0.5)
        ax1.legend()

        # Plot Classification Confidence
        ax2.plot(df.index, df["confidence"], color="#6366f1", linewidth=2, label="Confidence %")
        ax2.set_xlabel("Frame Index")
        ax2.set_ylabel("Confidence %")
        ax2.grid(True, linestyle="--", alpha=0.5)
        ax2.legend()

        plt.tight_layout()
        plt.savefig(output_path, dpi=150)
        plt.close()
        print(f"Analytics report successfully saved to {output_path}")
        return True

if __name__ == "__main__":
    analytics = ActivityAnalytics()
    import time
    for i in range(20):
        analytics.log_entry("WORKING", 95.0 + i * 0.2, 35000 + np.random.randint(-2000, 2000), time.time() + i)
    analytics.generate_report()
