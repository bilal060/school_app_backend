const Event = require("../Model/events");
const Gallery = require('../Model/imageGallery');

const Createimage = async (req, res) => {
  const { imageUrl, title, description, date } = req.body;
  try {
    const gallery = new Gallery({ imageUrl, title, description, date });
    await gallery.save();
    res.json(gallery);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getGalleriesImage = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
}


  const getGalleryImage = async (req, res) => {
    try {
      const gallery = await Gallery.findById(req.params.id);
      if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
      }
      res.json(gallery);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const updateGalleryImage = async (req, res) => {
    try {
      const gallery = await Gallery.findById(req.params.id);
      if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
      }
      const { imageUrl, title, description, date } = req.body;
      if (imageUrl) {
        gallery.imageUrl = imageUrl;
      }
      if (title) {
        gallery.title = title;
      }
      if (description) {
        gallery.description = description;
      }
      if (date) {
        gallery.date = date;
      }
      await gallery.save();
      res.json(gallery);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
  const deleteEvent= async (req, res) => {
    try {
      const gallery = await Gallery.findById(req.params.id);
      if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
      }
      await gallery.remove();
      res.json({ message: 'Gallery deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }


exports.Createimage = Createimage;
exports.getGalleriesImage = getGalleriesImage;
exports.getGalleryImage = getGalleryImage;
exports.updateGalleryImage = updateGalleryImage;
exports.deleteEvent = deleteEvent;
