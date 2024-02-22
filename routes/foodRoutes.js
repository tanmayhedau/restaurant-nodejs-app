const express = require('express');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { creatFoodController, getAllFoodController, getSingleFoodController, GetFoodByRestaurant, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodControllers');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

const router = express.Router();

// CREATE FOOD
router.post('/create', authMiddleware, creatFoodController);

// GET ALL FOOD
router.get('/get-all', getAllFoodController);

// GET SINGLE FOOD
router.get('/get-food/:id', getSingleFoodController);

// GET FOOD BY RESTAURANT
router.get('/get-by-restaurant/:id', GetFoodByRestaurant);

// UPDATE FOOD
router.put('/update/:id', authMiddleware, updateFoodController);

// DELETE FOOD
router.delete('/delete/:id', authMiddleware, deleteFoodController);

// PLACE ORDER
router.post('/placeorder', authMiddleware, placeOrderController);

// ORDER STATUS
router.post('/order-status/:id', authMiddleware, adminMiddleware, orderStatusController);

module.exports = router;