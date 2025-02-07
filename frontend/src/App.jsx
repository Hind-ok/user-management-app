import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Ajout du fichier CSS

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Erreur lors du chargement des utilisateurs:", error));
  }, []);

  const addUser = () => {
    if (!name || !email) return alert("Veuillez remplir tous les champs.");
    
    axios.post("http://localhost:5000/users", { name, email })
      .then(response => {
        setUsers([...users, response.data]);
        setName("");
        setEmail("");
      })
      .catch(error => console.error("Erreur lors de l'ajout:", error));
  };

  return (
    <div className="container">
      <h1>Gestion des utilisateurs</h1>

      <input 
        type="text" 
        placeholder="Nom" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button onClick={addUser}>Ajouter</button>

      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} : {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
