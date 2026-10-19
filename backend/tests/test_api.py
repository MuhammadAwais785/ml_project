import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "backend"))
from app import app, FEATURES

def sample():
    return {f: 42 if f in {"Age", "Obesity_BMI", "Hemoglobin ", "CEA_Level", "serum Albumin"} else "No" for f in FEATURES}

def test_health():
    response = app.test_client().get('/health')
    assert response.status_code == 200
    assert response.get_json()['features'] == 24

def test_predict_valid():
    response = app.test_client().post('/predict', json=sample())
    assert response.status_code == 200
    assert response.get_json()['mode'] == 'demo'
    assert response.get_json()['prediction'] is None

def test_predict_missing_feature():
    data = sample(); data.pop(FEATURES[0])
    assert app.test_client().post('/predict', json=data).status_code == 400

def test_predict_invalid_json():
    assert app.test_client().post('/predict', data='not-json',content_type='application/json').status_code == 400
