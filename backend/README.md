# Centre Dentaire Dr Maha El Marzouki - Backend Setup

## Installation et Configuration

### 1. Installer Python et les dépendances

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances Python
pip install -r requirements.txt
```

### 2. Démarrer le serveur backend

#### Option 1: Ligne de commande
```bash
# Depuis le dossier backend
python -m uvicorn main:app --reload --port 8000
```

#### Option 2: Scripts automatiques
```bash
# Sur Linux/Mac
./start_server.sh

# Sur Windows
start_server.bat
```

### 3. Vérifier que le serveur fonctionne

Ouvrir http://localhost:8000 dans votre navigateur. Vous devriez voir:
```json
{"message": "Centre Dentaire Dr Maha El Marzouki - API Backend"}
```

### 4. Documentation de l'API

Une fois le serveur démarré, vous pouvez consulter la documentation automatique:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### POST /api/reservations
Créer une nouvelle réservation
```json
{
  "name": "Ahmed Bennani",
  "phone": "+212 6 12 34 56 78",
  "email": "ahmed@email.com",
  "preferred_date": "2024-12-01T10:00",
  "message": "Consultation pour nettoyage"
}
```

### GET /api/reservations
Lister toutes les réservations

### GET /api/reservations/{id}
Récupérer une réservation spécifique

### PUT /api/reservations/{id}/status
Mettre à jour le statut d'une réservation

## Base de données

Le backend utilise SQLite avec un fichier `reservations.db` qui sera créé automatiquement.

### Structure de la table reservations:
- `id`: Identifiant unique (auto-increment)
- `name`: Nom du patient
- `phone`: Numéro de téléphone
- `email`: Email (optionnel)
- `preferred_date`: Date/heure préférée
- `message`: Message du patient
- `created_at`: Date de création
- `status`: Statut (pending, confirmed, cancelled)

## Intégration Frontend

Le formulaire de réservation React se connecte automatiquement à l'API backend sur `http://localhost:8000`.

Assurez-vous que:
1. Le backend tourne sur le port 8000
2. Le frontend tourne sur le port 5173 ou 5174
3. CORS est configuré pour permettre les connexions

## Sécurité et Production

Pour la production, considérez:
- Utiliser PostgreSQL au lieu de SQLite
- Ajouter l'authentification JWT
- Configurer HTTPS
- Ajouter la validation des données côté serveur
- Implémenter la limitation de débit (rate limiting)

## Dépannage

### Erreur de port occupé
```bash
# Changer le port si 8000 est occupé
uvicorn main:app --reload --port 8001
```

### Erreur CORS
Vérifiez que l'URL de votre frontend est dans la liste `allow_origins` dans `main.py`

### Problème de base de données
Supprimez `reservations.db` pour recréer une base de données vide