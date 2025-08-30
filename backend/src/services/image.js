const Image = require('../models/image');

const uploadImage = async (file) => {
    const newImage = new Image({
        filename: file.originalname,
        data: file.buffer,
        contentType: file.mimetype
    });
    await newImage.save();
    return { message: 'Image uploaded!' };
};

const getImages = async () => {
    return await Image.find();
};

const getImageById = async (id) => {
    return await Image.findById(id);
};

const deleteImage = async (id) => {
    const deletedImage = await Image.findByIdAndDelete(id);
    if (!deletedImage) {
        throw new Error('Image not found');
    }
    return { message: 'Image deleted successfully' };
};

module.exports = {
    uploadImage,
    getImages,
    getImageById,
    deleteImage
};