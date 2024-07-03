    const express = require('express');
    const AssetHistory = require('../models/assetHistory');
    const auth = require('../middleware/auth');
    const checkRole = require('../middleware/checkRole');
    const router = express.Router();

    // Route to register a new asset history record
    router.post('/assetHistory', auth, checkRole('superuser'), async (req, res) => {
        try {
            const newAssetHistory = new AssetHistory(req.body);
            await newAssetHistory.save();
            res.status(201).send(newAssetHistory);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    // Route to get all asset history records
    router.get('/assetHistory', auth, checkRole('superuser'), async (req, res) => {
        try {
            const assetHistories = await AssetHistory.find();
            res.status(200).send(assetHistories);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    module.exports = router;
