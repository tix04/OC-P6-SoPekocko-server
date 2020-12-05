const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.get('/', sauceCtrl.getAllSauces);
router.post('/', sauceCtrl.createNewSauce);
router.get('/:id', sauceCtrl.getOneSauce);
router.put('/:id', sauceCtrl.updateSauce);
router.delete('/:id', sauceCtrl.deleteSauce);

module.exports = router;