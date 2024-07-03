const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();
router.get('/:id', userController.getUser);
router.post('/:id/order', userController.placeOrder);

module.exports = router;
