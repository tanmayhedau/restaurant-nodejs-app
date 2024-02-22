const express = require('express');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require('../controllers/categoryControllers');


const router = express.Router();

// CREATE CATEGORY
router.post('/create-category', authMiddleware, createCatController);

// GET ALL CATEGORY
router.get('/get-all-category', getAllCatController);

// UPDATE CATEGORY
router.put('/update-category/:id', authMiddleware, updateCatController);

// DELETE CATEGORY
router.delete('/delete-category/:id', authMiddleware, deleteCatController);

module.exports = router;