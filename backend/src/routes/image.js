const express = require('express');
const multer = require('multer');
const { uploadImage, getImages, getImageById, deleteImage } = require('../services/image');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload image
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await uploadImage(req.file);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all images
router.get('/images', async (req, res) => {
    try {
        const images = await getImages();
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single image
router.get('/image/:id', async (req, res) => {
    try {
        const image = await getImageById(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });
        res.contentType(image.contentType);
        res.send(image.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete imgae
router.delete('/image/:id', async (req, res) => {
    try {
        const result = await deleteImage(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;