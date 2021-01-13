const express = require('express');  
const router = express.Router();

const emptyDataValidator = require('../middleware/EmptyDataValidator');
const inputValidator = require('../middleware/inputValidator');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');
const likeValidator = require('../middleware/likeValidator');


router.post('/',  auth, multer, emptyDataValidator, inputValidator, sauceCtrl.createSauce);
router.post('/:id/like', auth, /*likeValidator ,*/sauceCtrl.setLikes);
router.put('/:id', auth, multer, emptyDataValidator, inputValidator,sauceCtrl.modifySauce);
router.delete('/:id',  auth, sauceCtrl.deleteSauce);
router.get('/:id',  auth, sauceCtrl.getOneSauce); 
router.get('/', auth, sauceCtrl.getAllSauces);  

module.exports = router;  