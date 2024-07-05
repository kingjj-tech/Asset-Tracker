const express = require('express');
const Asset = require('../models/asset');
const router = express.Router();

// Route to create a new asset
router.post('/', async (req, res) => {
    try {
        const newAsset = new Asset(req.body);
        await newAsset.save();
        res.status(201).send(newAsset);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to get all assets
router.get('/', async (req, res) => {
    try {
        const assets = await Asset.find();
        res.status(200).send(assets);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
