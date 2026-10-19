"""Teaching API. Mock responses are NEVER real model predictions."""
from pathlib import Path
import json
import os
import joblib
import pandas as pd
from flask import Flask, jsonify, request

BASE = Path(__file__).resolve().parent
FEATURES_META = json.loads((BASE / "feature_schema.json").read_text(encoding="utf-8"))
FEATURES = [f["name"] for f in FEATURES_META]
MODE = os.getenv("MODEL_MODE", "demo").lower()  # demo | real
app = Flask(__name__)
MODEL = None
THRESHOLD = None
MODEL_ERROR = None

if MODE == "real":
    try:
        MODEL = joblib.load(BASE / "models" / "full_pipeline.pkl")
        cfg = json.loads((BASE / "models" / "model_config.json").read_text(encoding="utf-8"))
        THRESHOLD = float(cfg["optimal_threshold"])
    except Exception as exc:
        MODEL_ERROR = f"{type(exc).__name__}: {exc}"

@app.get("/health")
def health():
    return jsonify(status="ok" if MODE == "demo" or MODEL is not None else "model_unavailable",
                   mode=MODE, features=len(FEATURES), model_ready=MODEL is not None), (200 if MODE == "demo" or MODEL is not None else 503)

@app.get("/schema")
def schema():
    return jsonify(features=FEATURES_META, mode=MODE)

@app.post("/predict")
def predict():
    body = request.get_json(silent=True)
    if not isinstance(body, dict):
        return jsonify(error="Expected JSON object"), 400
    missing = [f for f in FEATURES if f not in body]
    extra = [f for f in body if f not in FEATURES]
    if missing or extra:
        return jsonify(error="Input schema mismatch", missing=missing, extra=extra), 400
    for feature in FEATURES_META:
        value = body[feature["name"]]
        if value is None or value == "":
            return jsonify(error=f"Required input: {feature['name']}"), 400
        if feature["kind"] == "number":
            try:
                number = float(value)
                import math
                if not math.isfinite(number): raise ValueError()
            except (ValueError, TypeError):
                return jsonify(error=f"Invalid numeric value: {feature['name']}"), 400
    if MODE == "demo":
        return jsonify(prediction=None, probabilities=None, task="classification", mode="demo",
                       disclaimer="DEMO MODE: form and API are working; no ML prediction was performed.")
    if MODEL is None:
        return jsonify(error="Model unavailable; check server logs and installed versions", mode="real"), 503
    try:
        # IMPORTANT: feature categories here are placeholders until encoding is verified.
        # For real mode, replace/adapt this inference block to match the saved model's raw input contract.
        frame = pd.DataFrame([[body[name] for name in FEATURES]], columns=FEATURES)
        if hasattr(MODEL, "predict_proba"):
            prob = [float(x) for x in MODEL.predict_proba(frame)[0]]
            prediction = int(prob[1] >= THRESHOLD) if len(prob) == 2 else int(MODEL.predict(frame)[0])
            return jsonify(prediction=prediction, probabilities=prob, task="classification",
                           threshold=THRESHOLD, mode="real", disclaimer="Research/teaching prototype only; not a medical diagnosis.")
        raw = MODEL.predict(frame)[0]
        prediction = raw.item() if hasattr(raw, "item") else raw
        return jsonify(prediction=prediction, task="classification", mode="real",
                       disclaimer="Research/teaching prototype only; not a medical diagnosis.")
    except Exception:
        app.logger.exception("Model inference failed")
        return jsonify(error="Model inference failed; verify saved feature schema and preprocessing", mode="real"), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
