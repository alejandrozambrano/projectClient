const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // ✅ Importa dotenv

const app = express();
const PORT = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB (Atlas o local según tu .env)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Erreur MongoDB:', err));

// Rutas
const authRouter = require('./routes/authRoutes');
app.use('/auth', authRouter);

const videoRouter = require('./routes/videoRoutes');
app.use('/videos', videoRouter);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Server en écoute sur http://localhost:${PORT}`);
});
