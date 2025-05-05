// src/components/AddVideo.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddVideo.css";

function AddVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddVideo = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:3010/videos/",  // ✅ RUTA CORRECTA SEGÚN TU BACKEND
        { title, description, url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/videos");
    } catch (err) {
      console.error("Erreur axios:", err.response?.data || err.message);
      setError("❌ Erreur lors de l'ajout de la vidéo");
    }
  };

  return (
    <div className="add-video-container">
      <h2>Ajouter une vidéo</h2>
      <form onSubmit={handleAddVideo}>
        <input
          type="text"
          placeholder="Nom de la vidéo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL de la vidéo"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}

export default AddVideo;
