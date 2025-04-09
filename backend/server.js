const { Client } = require("pg");
const express = require("express");
const cors = require("cors");

// 
require('dotenv').config();


const app = express();
const port = 5174;

// Configuration plus stricte de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Autoriser uniquement le frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  allowedHeaders: ['Content-Type'], // Headers autorisés
};

// Middleware
app.use(cors(corsOptions)); // Utiliser la configuration CORS
app.use(express.json());

// Connexion à PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: 'Amraouihind2003',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à PostgreSQL', err.stack);
  } else {
    console.log('Connecté à PostgreSQL');
    client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        age INTEGER NOT NULL,
        role TEXT NOT NULL
      )
    `, (err, res) => {
      if (err) {
        console.error('Erreur lors de la création de la table', err.stack);
      } else {
        console.log('Table "users" créée ou déjà existante.');
      }
    });
  }
});

// Route pour récupérer tous les utilisateurs
app.get("/users", (req, res) => {
  client.query("SELECT * FROM users ORDER BY id ASC", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result.rows);
  });
});

// Route pour ajouter un utilisateur
app.post("/users", (req, res) => {
  const { name, email, age, role } = req.body;
  if (!name || !email || !age || !role) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  client.query(
    "INSERT INTO users (name, email, age, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, parseInt(age), role],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json(result.rows[0]);
    }
  );
});

// Route pour modifier un utilisateur
app.put("/users/:id", (req, res) => {
  const { name, email, age, role } = req.body;
  const { id } = req.params;

  if (!name || !email || !age || !role) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  client.query(
    "UPDATE users SET name = $1, email = $2, age = $3, role = $4 WHERE id = $5 RETURNING *",
    [name, email, parseInt(age), role, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      res.json(result.rows[0]);
    }
  );
});

// Route pour supprimer un utilisateur
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  client.query("DELETE FROM users WHERE id = $1 RETURNING *", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json({ message: "Utilisateur supprimé avec succès", user: result.rows[0] });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur backend sur http://localhost:${port}`);
});
