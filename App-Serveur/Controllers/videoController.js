const Video = require('../models/Video');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

// ➕ Añadir un nuevo video
exports.addVideo = async (req, res) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      const { title, description, url } = req.body;
      const newVideo = new Video({ title, description, url, userId });
      await newVideo.save();
  
      res.status(201).json({ message: "Vidéo ajoutée avec succès." });
    } catch (err) {
      res.status(400).json({ error: "Erreur lors de l'ajout de la vidéo." });
    }
  };
  

// 📥 Obtenir les vidéos de l'utilisateur connecté
exports.getAllVideos = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const videos = await Video.find({ userId });
    res.json(videos);
  } catch (error) {
    console.error("Erreur de chargement des vidéos:", error);
    res.status(500).json({ error: "Erreur de chargement des vidéos" });
  }
};

// ❌ Supprimer une vidéo par ID
exports.deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const video = await Video.findOne({ _id: videoId, userId });
    if (!video) {
      return res.status(404).json({ error: 'Vidéo non trouvée ou non autorisée' });
    }

    await Video.findByIdAndDelete(videoId);
    res.json({ message: 'Vidéo supprimée avec succès' });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};
