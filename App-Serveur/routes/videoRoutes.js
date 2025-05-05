const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/videoController');
const verifyToken = require('../middelware/verifyToken');

router.post('/', videoController.addVideo);
router.get('/', videoController.getAllVideos);
router.delete('/:id', videoController.deleteVideo);



module.exports = router;
