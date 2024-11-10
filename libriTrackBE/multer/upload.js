var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, cover, cb) => {
      cb(null, './public/images');
    },
    filename: (req, cover, cb) => {
      var filetype = '';

      if(cover.mimetype === 'image/gif') {
        filetype = 'gif';
      }

      if(cover.mimetype === 'image/png') {
        filetype = 'png';
      }

      if(cover.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload;