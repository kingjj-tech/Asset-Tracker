const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/generate', authMiddleware, reportController.generateReport);
router.get('/all', authMiddleware, reportController.getAllReports);
router.get('/download/:id', authMiddleware, reportController.downloadReport);

module.exports = router;