const multer = require('multer');
// set up the multer middleware to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  const upload = multer({ 
    storage: storage, 
    fileFilter: function (req, file, cb) {
      if (file.fieldname === 'image') {
        cb(null, true);
      } else {
        cb(new Error('Unexpected field'));
      }
    }
  })


  exports.upload = upload

  // const userStorage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, './uploads/Student_UserImage');
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  //   }
  // });
  
  // const adminStorage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, './uploads/Admin_UserImage');
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  //   }
  // });
  
  // const uploadUserImage = multer({ storage: userStorage }); 
  // const uploadAdminImage = multer({ storage: adminStorage });
  