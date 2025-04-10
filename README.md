# Gestion des Utilisateurs - Hind Amraoui

Ce projet est une application full-stack de gestion des utilisateurs, développée avec React.js pour le frontend, Express.js pour le backend, et une base de données PostgreSQL. L’objectif est de fournir une interface intuitive permettant de créer, lire, mettre à jour et supprimer des utilisateurs (CRUD), tout en assurant la qualité du code et la portabilité de l'application grâce à Docker et GitHub Actions.

## 📁 Structure du Projet

- **Frontend**  : React (Vite) + Axios
- **Backend**  : Express.js (Node.js)
- **Base de données**  : PostgreSQL
- **Tests API** : Postman
- **Tests**  : Mocha & Chai
- **Dockerisation**  : Docker + Docker Compose
- **CI/CD**  : GitHub Actions
- **Déploiement**  : Vercel (frontend)


---

## ⚡ Prérequis

-Node.js (https://nodejs.org/)
-Docker & Docker Compose (https://www.docker.com/)
-PostgreSQL (si en local)
-Vercel CLI (optionnel)
---

## 🚀 Installation

### 🖥️ Backend

1. **Naviguez vers le répertoire `backend`** :

-cd backend
-npm install
-node server.js

    🔹 Le backend sera disponible sur http://localhost:5174.

### 🎨 Frontend

2. **Naviguez vers le répertoire frontend :**

-cd frontend
-npm install
-npm run dev

    🔹 L'application sera disponible sur http://localhost:5173.

🛠️ Fonctionnalités

✅ Afficher la liste des utilisateurs

✅ Ajouter un nouvel utilisateur

✅ Modifier un utilisateur existant

✅ Supprimer un utilisateur

✅ Tests API avec Mocha/Chai

✅ Dockerisation complète (backend, frontend, db)

✅ Intégration Continue via GitHub Actions

✅ Déploiement du frontend sur Vercel

✅ Interface responsive et moderne

3. **🐳 Dockerisation (Full Project)**

-docker-compose up --build

4. **🧪 Tests**

-npm test

🖼️ Captures d'écran
![Capture d'écran](https://imgur.com/D6WBn2j.png)
![Capture d'écran](https://imgur.com/FdErESJ.png)
![Capture d'écran](https://i.imgur.com/M9TD6aL.png)
