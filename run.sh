#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "🌱 Starting NASA Crop Rotation Advisor Platform"
echo "=========================================================="

cd "$(dirname "$0")"

# Activate Python Virtualenv
if [ -d "venv" ]; then
    source venv/bin/activate
else
    echo "Creating virtualenv..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r backend/requirements.txt
fi

# Build frontend if dist does not exist
if [ ! -d "frontend/dist" ]; then
    echo "Building frontend bundle..."
    cd frontend
    npm install
    npm run build
    cd ..
fi

echo ""
echo "🚀 Launching Unified Server at http://127.0.0.1:8000"
echo "   - Web App UI:      http://127.0.0.1:8000"
echo "   - Interactive API: http://127.0.0.1:8000/docs"
echo "=========================================================="
echo ""

PYTHONPATH=. uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
