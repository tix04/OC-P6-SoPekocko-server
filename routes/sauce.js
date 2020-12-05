const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, sauceCtrl.createNewSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;