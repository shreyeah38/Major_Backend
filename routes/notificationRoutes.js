const express = require('express');
const multer = require('multer');
const { createNotification,  getNotifications, deleteNotification} = require('../controllers/notificationController');
const { authMiddleware, adminAuthMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temp storage location for files

// Admin route to create notification
router.post('/notifications', authMiddleware, adminAuthMiddleware, upload.single('document'), createNotification);

// Get all notifications (login required)
router.get('/notifications', authMiddleware, getNotifications);

router.delete('/notifications/:id', authMiddleware, adminAuthMiddleware, deleteNotification);


module.exports = router;
