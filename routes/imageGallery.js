const express = require('express')
const {  Createimage,
    getGalleriesImage,
     getGalleryImage,
     updateGalleryImage,
     deleteEvent } = require('../Controller/imageGalleryController');
const imageGalleryrouter = express.Router()

imageGalleryrouter.post('/imageGallery',Createimage);
imageGalleryrouter.get('/imageGallery',getGalleriesImage);
imageGalleryrouter.get('/imageGallery/:id',getGalleryImage);
imageGalleryrouter.patch('/imageGallery/:id',updateGalleryImage);
imageGalleryrouter.delete('/imageGallery/:id',deleteEvent);

module.exports =imageGalleryrouter;
