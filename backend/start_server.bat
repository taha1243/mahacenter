@echo off
echo Demarrage du serveur FastAPI...
cd /d "%~dp0"
python -m uvicorn main:app --reload --port 8000 --host 0.0.0.0
pause