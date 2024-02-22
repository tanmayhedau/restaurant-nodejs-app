const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController } = require('../controllers/userControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// GET USER || GET METHOD
router.get('/get-user', authMiddleware, getUserController);

// UPDATE USER || PUT METHOD
router.put('/update-user', authMiddleware, updateUserController);

// UPDATE PASSWORD || PUT METHOD
router.put('/update-password', authMiddleware, updatePasswordController);

// RESET PASSWORD || POST METHOD
router.post('/reset-password', authMiddleware, resetPasswordController);

// DELETE USER || DELETE METHOD
router.delete('/delete-user/:id', authMiddleware, deleteUserController);

module.exports = router;