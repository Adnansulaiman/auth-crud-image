const multer = require('multer');
const path = require('path');


// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, path.join(__dirname, '../uploads')); // Folder for image uploads
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValidType = allowedTypes.test(file.mimetype);
  const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isValidType && isValidExt) cb(null, true);
  else cb(new Error('Only images are allowed'));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;