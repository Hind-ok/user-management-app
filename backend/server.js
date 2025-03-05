// const { Client } = require('pg');

// const express = require("express");
// const sqlite3 = require("sqlite3").verbose();
// const cors = require("cors");

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connexion à SQLite
// const db = new sqlite3.Database("./users.db", (err) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log("Connecté à SQLite");
//     db.run(
//       `CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//   email TEXT NOT NULL UNIQUE,
//   age INTEGER NOT NULL,
//   role TEXT NOT NULL
//       )`
//     );
//   }
// });

// // Routes CRUD
// // Route pour récupérer tous les utilisateurs
// app.get("/users", (req, res) => {
//     db.all("SELECT * FROM users", [], (err, rows) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.json(rows);
//     });
//   });
// //  Route pour ajouter un utilisateur
// app.post("/users", (req, res) => {
//   const { name, email, age, role } = req.body;
//   if (!name || !email || !age || !role) {
//     return res.status(400).json({ error: "Tous les champs sont obligatoires." });
//   }
  
//   db.run(
//     "INSERT INTO users (name, email, age, role) VALUES (?, ?, ?, ?)",
//     [name, email, age, role],
//     function (err) {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.json({ id: this.lastID, name, email, age, role });
//     }
//   );
// });

// // Route pour modifier un utilisateur
// app.put("/users/:id", (req, res) => {
//   const { name, email, age, role } = req.body;
//   const { id } = req.params;

//   db.run(
//     "UPDATE users SET name = ?, email = ?, age = ?, role = ? WHERE id = ?",
//     [name, email, age, role, id],
//     function (err) {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.json({ id, name, email, age, role });
//     }
//   );
// });

// // Route pour supprimer un utilisateur
// app.delete("/users/:id", (req, res) => {
//   const { id } = req.params;

//   db.run("DELETE FROM users WHERE id = ?", id, function (err) {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ message: "Utilisateur supprimé avec succès" });
//   });
// });


// // Démarrer le serveur
// app.listen(port, () => {
//   console.log(`Serveur sur http://localhost:${port}`);
// });


//ici dans la partie with vercil
//  const sqlite3 = require("sqlite3").verbose();

// const express = require("express");
// const { Client } = require("pg");
// const cors = require("cors");

// const app = express();
// const port = 5174;  // Le port du serveur

// // Middleware
// app.use(cors());  // Pour autoriser les requêtes cross-origin
// app.use(express.json());  // Pour parser les données JSON envoyées

// // Connexion à PostgreSQL
// const client = new Client({
//   user: 'postgres',      // Remplace par ton nom d'utilisateur PostgreSQL
//   host: 'localhost',     // Hôte local
//   database: 'users',     // Nom de la base de données (assure-toi qu'elle existe)
//   password: 'Hindamraoui@2003', // Remplace par ton mot de passe PostgreSQL
//   port: 5432,            // Port par défaut de PostgreSQL
// });

// // Connexion à PostgreSQL et création de la table si nécessaire
// client.connect((err) => {
//   if (err) {
//     console.error('Erreur de connexion à PostgreSQL', err.stack);
//   } else {
//     console.log('Connecté à PostgreSQL');
//     client.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         name TEXT NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         age INTEGER NOT NULL,
//         role TEXT NOT NULL
//       )
//     `, (err, res) => {
//       if (err) {
//         console.error('Erreur lors de la création de la table', err.stack);
//       } else {
//         console.log('Table "users" créée ou déjà existante.');
//       }
//     });
//   }
// });

// // Routes CRUD

// // Route pour récupérer tous les utilisateurs
// app.get("/users", (req, res) => {
//   client.query("SELECT * FROM users", (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(result.rows);
//   });
// });

// // Route pour ajouter un utilisateur
// app.post("/users", (req, res) => {
//   const { name, email, age, role } = req.body;
//   if (!name || !email || !age || !role) {
//     return res.status(400).json({ error: "Tous les champs sont obligatoires." });
//   }

//   client.query(
//     "INSERT INTO users (name, email, age, role) VALUES ($1, $2, $3, $4) RETURNING *",
//     [name, email, age, role],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.json(result.rows[0]);
//     }
//   );
// });

// // Route pour modifier un utilisateur
// app.put("/users/:id", (req, res) => {
//   const { name, email, age, role } = req.body;
//   const { id } = req.params;

//   client.query(
//     "UPDATE users SET name = $1, email = $2, age = $3, role = $4 WHERE id = $5 RETURNING *",
//     [name, email, age, role, id],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.json(result.rows[0]);
//     }
//   );
// });

// // Route pour supprimer un utilisateur
// app.delete("/users/:id", (req, res) => {
//   const { id } = req.params;

//   client.query("DELETE FROM users WHERE id = $1 RETURNING *", [id], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ message: "Utilisateur supprimé avec succès", user: result.rows[0] });
//   });
// });

// // Démarrer le serveur
// app.listen(port, () => {
//   console.log(`Serveur sur http://localhost:${port}`);
// });

const { Client } = require("pg");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5174;  // Le port du serveur

// Middleware
app.use(cors());
app.use(express.json());  // Pour parser les données JSON envoyées

// Connexion à PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'db',  // Utilise le nom du service PostgreSQL défini dans docker-compose.yml
  database: 'users',
  password: 'Hindamraoui@2003',
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
connectToDatabase();
// ici dans la partie with docker 
// const { Client } = require("pg");
// const express = require("express");
// const cors = require("cors");

// const app = express();
// const port = 5174;  // Le port du serveur

// // Middleware
// app.use(cors());  // Pour autoriser les requêtes cross-origin
// app.use(express.json());  // Pour parser les données JSON envoyées

// Connexion à PostgreSQL
// const client = new Client({
//   user: 'postgres',      // Remplace par ton nom d'utilisateur PostgreSQL
//   host: 'localhost',     // Hôte local
//   database: 'users',     // Nom de la base de données (assure-toi qu'elle existe)
//   password: 'Hindamraoui@2003', // Remplace par ton mot de passe PostgreSQL
//   port: 5432,            // Port par défaut de PostgreSQL
// });
// Connexion à PostgreSQL et création de la table si nécessaire
// client.connect((err) => {
//   if (err) {
//     console.error('Erreur de connexion à PostgreSQL', err.stack);
//   } else {
//     console.log('Connecté à PostgreSQL');
//     client.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         name TEXT NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         age INTEGER NOT NULL,
//         role TEXT NOT NULL
//       )
//     `, (err, res) => {
//       if (err) {
//         console.error('Erreur lors de la création de la table', err.stack);
//       } else {
//         console.log('Table "users" créée ou déjà existante.');
//       }
//     });
//   }
// });

// Routes CRUD

// Route pour récupérer tous les utilisateurs
app.get("/users", (req, res) => {
  client.query("SELECT * FROM users", (err, result) => {
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
    [name, email, age, role],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result.rows[0]);
    }
  );
});

// Route pour modifier un utilisateur
app.put("/users/:id", (req, res) => {
  const { name, email, age, role } = req.body;
  const { id } = req.params;

  client.query(
    "UPDATE users SET name = $1, email = $2, age = $3, role = $4 WHERE id = $5 RETURNING *",
    [name, email, age, role, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
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
    res.json({ message: "Utilisateur supprimé avec succès", user: result.rows[0] });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur sur http://localhost:${port}`);
});
