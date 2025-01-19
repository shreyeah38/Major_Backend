const express = require('express');
const multer = require('multer');
const { submitCertificate, getCertificates, getStudentCertificates } = require('../controllers/certificateController');
const { authMiddleware , adminAuthMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary folder for file uploads

// Submit a certificate (accessible to students and admins)
router.post('/certificates', authMiddleware, upload.single('document'), submitCertificate);
router.get('/certificates', authMiddleware, adminAuthMiddleware, getCertificates);
router.get('/certificates/student/:enrollment', authMiddleware, adminAuthMiddleware, getStudentCertificates);

module.exports = router;

