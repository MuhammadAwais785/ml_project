from pathlib import Path

def test_files_exist():
    root=Path(__file__).resolve().parents[2]
    for f in ['backend/app.py','backend/feature_schema.json','frontend/package.json','Readme.md']:
        assert (root/f).exists()
