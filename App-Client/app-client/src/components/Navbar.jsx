import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Protege el parseo de JSON
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Erreur de parsing user:", error);
  }

  const userName = user?.name || user?.email?.split("@")[0] || "Utilisateur";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">🎬 Streaming Site</div>
      <ul className="navbar-links">
        {token ? (
          <>
            <li><Link to="/videos">Vidéos</Link></li>
            <li><Link to="/profile">Utilisateur</Link></li>
            <li><Link to="/add">Ajouter une vidéo</Link></li>
            <li><Link to="/delete">Supprimer le compte</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Déconnexion</button></li>
            <li className="welcome">👋 Bienvenue, {userName}</li>
          </>
        ) : (
          <>
            <li><Link to="/login">Connexion</Link></li>
            <li><Link to="/signup">Inscription</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
