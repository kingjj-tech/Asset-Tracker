const express = require('express');
const router = express.Router();
const superUserController = require('../controllers/superUserController');
const assetController = require('../controllers/assetController');
const assetHistoryController = require('../controllers/assetHistoryController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');
const auth = require('../middleware/auth');

router.use(authMiddleware);
router.use(checkRole(['superuser']));

// Superuser specific routes
router.post('/create-user', superUserController.createUser);
router.get('/users', superUserController.getAllUsers);

// User routes for superuser
const userController = require('../controllers/userController');
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Asset routes for superuser
router.get('/assets', assetController.getAllAssets);
router.post('/assets', assetController.createAsset);
router.get('/assets/:id', assetController.getAssetById);
router.put('/assets/:id', assetController.updateAsset);
router.delete('/assets/:id', assetController.deleteAsset);

// Asset history routes for superuser
router.get('/assetHistory', assetHistoryController.getAllAssetHistories);
router.post('/assetHistory', assetHistoryController.createAssetHistory);
router.get('/assetHistory/:id', assetHistoryController.getAssetHistoryById);
router.put('/assetHistory/:id', assetHistoryController.updateAssetHistory);
router.delete('/assetHistory/:id', assetHistoryController.deleteAssetHistory);

module.exports = router;
