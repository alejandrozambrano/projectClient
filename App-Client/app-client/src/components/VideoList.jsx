// src/components/VideoList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VideoList.css";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3010/videos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos(res.data);
    } catch (err) {
      setError("Erreur de chargement des vidéos");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3010/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // 🔁 Actualiza después de eliminar
      fetchVideos();
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="video-list-container">
      <h2>Liste de vos vidéos</h2>
      {videos.length === 0 ? (
        <>
          <p>📮 Vous n’avez pas encore de vidéos.</p>
          <button onClick={() => window.location.href = "/add"}>Ajouter une vidéo</button>
        </>
      ) : (
        videos.map((video) => (
          <div key={video._id} className="video-card">
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <iframe
              width="100%"
              height="300"
              src={video.url.replace("watch?v=", "embed/")}
              title={video.title}
              allowFullScreen
            />
            <div className="video-actions">
              <button onClick={() => window.open(video.url, "_blank")}>Regarder</button>
              <button onClick={() => handleDelete(video._id)}>Supprimer</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default VideoList;

