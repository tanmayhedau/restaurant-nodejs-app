const express = require('express');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } = require('../controllers/restaurantController');

const router = express.Router();

// CREATE RESTAURANT || POST
router.post('/create-restaurant', authMiddleware, createRestaurantController);

// GET ALL RESTAURANTS || GET
router.get('/get-all', getAllRestaurantController);

//GET RESTAURANT BY ID || GET
router.get('/get-restaurant/:id', getRestaurantByIdController);

// DELETE RESTAURANT || DELETE
router.delete('/delete-restaurant/:id', authMiddleware, deleteRestaurantController);

module.exports = router;