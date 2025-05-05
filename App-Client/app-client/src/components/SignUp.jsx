import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3010/auth/signUp", {
        name,
        email,
        password,
      });

      const { token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email }));

      setMessage(`✅ Bienvenue, ${name} ! Votre compte a été créé avec succès.`);
      setName("");
      setEmail("");
      setPassword("");

      // Redirection après un court délai
      setTimeout(() => navigate("/"), 2000);

    } catch (error) {
      setMessage("❌ Erreur lors de l'inscription.");
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignUp;
