#!/bin/bash
# Script pour démarrer le serveur backend
echo "Démarrage du serveur FastAPI..."
cd "$(dirname "$0")"
python -m uvicorn main:app --reload --port 8000 --host 0.0.0.0