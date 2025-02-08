const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à SQLite
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connecté à SQLite");
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  age INTEGER NOT NULL,
  role TEXT NOT NULL
      )`
    );
  }
});

// Routes CRUD
// Route pour récupérer tous les utilisateurs
app.get("/users", (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });
//  Route pour ajouter un utilisateur
app.post("/users", (req, res) => {
  const { name, email, age, role } = req.body;
  if (!name || !email || !age || !role) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }
  
  db.run(
    "INSERT INTO users (name, email, age, role) VALUES (?, ?, ?, ?)",
    [name, email, age, role],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, name, email, age, role });
    }
  );
});

// Route pour modifier un utilisateur
app.put("/users/:id", (req, res) => {
  const { name, email, age, role } = req.body;
  const { id } = req.params;

  db.run(
    "UPDATE users SET name = ?, email = ?, age = ?, role = ? WHERE id = ?",
    [name, email, age, role, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id, name, email, age, role });
    }
  );
});

// Route pour supprimer un utilisateur
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM users WHERE id = ?", id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Utilisateur supprimé avec succès" });
  });
});


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur sur http://localhost:${port}`);
});
 
