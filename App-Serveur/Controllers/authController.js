const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.JWT_SECRET;


exports.signUp = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
      const user = new User({
        name: req.body.name,      // ✅ GUARDAR nombre
        email: req.body.email,
        password: hashedPassword,
      });
  
      await user.save();
  
      // ✅ CREAR TOKEN
      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "24h" });
  
      // ✅ ENVIAR RESPUESTA COMPLETA
      res.status(201).json({
        token,
        user: {
          name: user.name,
          email: user.email,
        }
      });
  
    } catch (err) {
      console.error("Erreur lors de l'inscription:", err);
      res.status(400).json({ error: "Échec de la création de l'utilisateur" });
    }
  };
  

exports.login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(400).send({ error: 'Utilisateur non trouvé' });
      }
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).send({ error: 'Mot de passe incorrect' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  
      // ✅ Devuelve también el nombre y el email
      res.send({
        token,
        user: {
          name: user.name,
          email: user.email
        }
      });
  
    } catch (err) {
      res.status(400).send({ error: 'Échec de la connexion' });
    }
  };
  
  exports.updatePassword = async (req, res) => {
    try {
      const { email, currentPassword, newPassword } = req.body;
  
      // Buscar usuario por email
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  
      // Verificar la contraseña actual
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
  
      // Encriptar la nueva contraseña
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();
  
      res.json({ message: 'Mot de passe mis à jour avec succès' });
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du mot de passe" });
    }
  };
  

  exports.deleteAccount = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Buscar usuario
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });
  
      await User.findOneAndDelete({ email });
  
      res.json({ message: 'Compte supprimé avec succès' });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la suppression du compte' });
    }
  };
  
  

