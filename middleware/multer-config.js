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
    console.log(file);
    const extension = MIME_TYPES[file.mimetype];
    
    callback(null, name + Date.now() + '.' + extension);
  }
});
//Validate only jpeg, jpg, png files
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    console.log(file.mimetype);
    if (file.mimetype !=='image/png' || file.mimetype !== 'image/jpg' || file.mimetype !== 'image/jpeg') {
      callback(null, false);
      return callback(new Error('Only .png, .jpg and .jpeg files are allowed!'));
      
    } else {
      callback(null, true);
    }
  }
});

module.exports = multer({upload: upload, storage: storage}).single('image');
/*module.exports = multer({storage: storage}).single('image');
module.exports = multer({upload: upload}).single('image');*/