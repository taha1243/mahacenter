# Centre Dentaire Dr Maha El Marzouki - Installation Complète

## Vue d'ensemble du projet

Ce projet contient:
- **Frontend React**: Site web professionnel avec formulaire de réservation
- **Backend FastAPI**: API pour gérer les rendez-vous avec base de données SQLite
- **Panneau d'administration**: Interface pour gérer les réservations

## Installation étape par étape

### 1. Prérequis

- **Node.js** (version 16 ou plus récente)
- **Python** (version 3.8 ou plus récente)
- **npm** ou **yarn**
- **pip** (gestionnaire de paquets Python)

### 2. Installation du Frontend (React)

```bash
# Dans le dossier racine du projet
npm install

# Démarrer le serveur de développement
npm run dev
```

Le site sera accessible sur: http://localhost:5173

### 3. Installation du Backend (FastAPI)

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances Python
pip install -r requirements.txt

# Démarrer le serveur API
python -m uvicorn main:app --reload --port 8000
```

L'API sera accessible sur: http://localhost:8000

### 4. Vérification de l'installation

1. **Frontend**: Ouvrir http://localhost:5173
2. **Backend**: Ouvrir http://localhost:8000 (devrait afficher un message JSON)
3. **Documentation API**: Ouvrir http://localhost:8000/docs

## Utilisation

### Pour les patients (Frontend)
1. Naviguer sur le site web
2. Cliquer sur "Prendre rendez-vous"
3. Remplir le formulaire de réservation
4. Soumettre la demande

### Pour l'administration
1. Créer un fichier `admin.html` ou accéder au panneau d'admin
2. Consulter la liste des réservations
3. Confirmer ou annuler les rendez-vous

## Structure du projet

```
maha dental center/
├── src/                          # Code source React
│   ├── components/              # Composants React
│   │   ├── ReservationForm.jsx  # Formulaire de réservation
│   │   └── AdminPanel.jsx       # Panneau d'administration
│   ├── assets/                  # Images et ressources
│   ├── ClinicLanding.jsx        # Composant principal
│   ├── main.jsx                 # Point d'entrée React
│   └── styles.css               # Styles CSS
├── backend/                     # Backend FastAPI
│   ├── main.py                  # Serveur API principal
│   ├── requirements.txt         # Dépendances Python
│   ├── start_server.bat         # Script Windows
│   ├── start_server.sh          # Script Linux/Mac
│   └── README.md               # Documentation backend
├── dist/                        # Fichiers de build
├── package.json                 # Dépendances Node.js
└── README.md                   # Ce fichier
```

## Fonctionnalités

### Site Web
- ✅ Design professionnel et responsive
- ✅ Support bilingue (Français/Arabe)
- ✅ Sections complètes (Hero, À propos, Services, Témoignages, FAQ, Contact)
- ✅ Intégration Google Maps
- ✅ Formulaire de réservation modal

### Backend API
- ✅ Création de réservations
- ✅ Liste des réservations
- ✅ Gestion des statuts
- ✅ Base de données SQLite
- ✅ Documentation automatique Swagger
- ✅ Support CORS pour le frontend

### Administration
- ✅ Tableau de bord avec statistiques
- ✅ Liste des réservations
- ✅ Gestion des statuts (En attente/Confirmé/Annulé)
- ✅ Interface responsive

## Déploiement en production

### Frontend
```bash
npm run build
# Les fichiers seront dans le dossier 'dist/'
```

### Backend
```bash
# Utiliser gunicorn pour la production
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

## Personnalisation

### Modifier les informations de contact
Éditer les props dans `ClinicLanding.jsx`:
- `phone`: Numéro de téléphone
- `email`: Adresse email
- `addressLine1` & `city`: Adresse
- `lat` & `lng`: Coordonnées GPS

### Modifier les services
Éditer l'objet `services` dans `ClinicLanding.jsx`

### Modifier les couleurs
Éditer les variables CSS dans `styles.css`:
```css
:root {
  --primary-blue: #1e40af;
  --primary-blue-light: #3b82f6;
  --primary-blue-dark: #1e3a8a;
}
```

## Support et maintenance

Pour obtenir de l'aide:
1. Vérifier la documentation API: http://localhost:8000/docs
2. Consulter les logs du serveur backend
3. Vérifier la console du navigateur pour les erreurs frontend

## Sécurité

⚠️ **Important pour la production**:
- Changer les URLs CORS dans le backend
- Utiliser HTTPS
- Ajouter l'authentification pour l'admin
- Configurer un vrai serveur de base de données
- Implémenter la limitation de débit (rate limiting)