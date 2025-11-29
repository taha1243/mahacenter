# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import sqlite3
from datetime import datetime
import uvicorn
import os

app = FastAPI(title="Centre Dentaire Dr Maha El Marzouki API")

# CORS middleware to allow React frontend to connect
# Get allowed origins from environment or use defaults
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:5174,https://mahacenter.vercel.app").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- DB INIT ----------
def get_connection():
    # Use environment variable for database path, default to local file
    db_path = os.getenv('DATABASE_PATH', 'reservations.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT,
            preferred_date TEXT,
            message TEXT,
            created_at TEXT NOT NULL,
            status TEXT DEFAULT 'pending'
        )
    """)
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

# ---------- Pydantic schemas ----------
class ReservationCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    preferred_date: Optional[str] = None  # ex: "2025-12-01T10:00"
    message: Optional[str] = None

class ReservationResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: Optional[str] = None
    preferred_date: Optional[str] = None
    message: Optional[str] = None
    created_at: str
    status: str

# ---------- Routes ----------
@app.get("/")
def read_root():
    return {"message": "Centre Dentaire Dr Maha El Marzouki - API Backend"}

@app.post("/api/reservations")
def create_reservation(res: ReservationCreate):
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO reservations (name, phone, email, preferred_date, message, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                res.name,
                res.phone,
                res.email,
                res.preferred_date,
                res.message,
                datetime.utcnow().isoformat()
            )
        )
        conn.commit()
        new_id = cur.lastrowid
        conn.close()
        return {"success": True, "id": new_id, "message": "Rendez-vous demandé avec succès"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la création: {str(e)}")

@app.get("/api/reservations")
def list_reservations():
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM reservations ORDER BY created_at DESC")
        rows = cur.fetchall()
        conn.close()
        return [dict(r) for r in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération: {str(e)}")

@app.get("/api/reservations/{reservation_id}")
def get_reservation(reservation_id: int):
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM reservations WHERE id = ?", (reservation_id,))
        row = cur.fetchone()
        conn.close()
        
        if not row:
            raise HTTPException(status_code=404, detail="Rendez-vous non trouvé")
        
        return dict(row)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur: {str(e)}")

@app.put("/api/reservations/{reservation_id}/status")
def update_reservation_status(reservation_id: int, status: str):
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            "UPDATE reservations SET status = ? WHERE id = ?",
            (status, reservation_id)
        )
        conn.commit()
        
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Rendez-vous non trouvé")
        
        conn.close()
        return {"success": True, "message": "Statut mis à jour"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)