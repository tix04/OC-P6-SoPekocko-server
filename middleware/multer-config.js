const multer = require('multer');

const MIME_TYPES = { 
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
//Store files in images folder and naming files
const storage = multer.diskStorage({ 
  destination: (req, file, callback) => { 
    callback(null, 'images');             
  },
  filename: (req, file, callback) => { 
    const name = file.originalname.split(' ').join('_');
    console.log(file)
    const extension = MIME_TYPES[file.mimetype]; 
    callback(null, name + Date.now() + '.' + extension);
  }
});
//Validate only jpeg, jpg, png files
var upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype =='image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error('Only .png, .jpg and .jpeg files are allowed!'));
    }
  }
});

module.exports = multer({storage: storage}).single('image');