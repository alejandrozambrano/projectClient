// src/components/Profile.jsx
import React, { useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  const handleChangePassword = async () => {
    try {
      await axios.put("http://localhost:3010/auth/update-password", {
        email,
        currentPassword,
        newPassword,
      });
      setMessage("🔐 Mot de passe modifié avec succès.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage("❌ Erreur lors du changement de mot de passe.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.post(
        "http://localhost:3010/auth/delete-account",
        { password: deletePassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      setMessage("❌ Erreur lors de la suppression du compte.");
    }
  };

  return (
    <div className="profile-container">
      <h2>👤 Mon Profil</h2>
      <p><strong>Email:</strong> {email}</p>

      <hr />
      <h3>🔑 Changer le mot de passe</h3>
      <input
        type="password"
        placeholder="Mot de passe actuel"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword}>Changer le mot de passe</button>

      <hr />
      <h3>⛔ Supprimer le compte</h3>
      <input
        type="password"
        placeholder="Mot de passe"
        value={deletePassword}
        onChange={(e) => setDeletePassword(e.target.value)}
      />
      <button className="btn-red" onClick={handleDeleteAccount}>
        Supprimer mon compte
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;
