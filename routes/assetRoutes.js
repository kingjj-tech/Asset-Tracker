const express = require('express');
const Asset = require('../models/asset');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const router = express.Router();

// Route to register a new asset
router.post('/assets', auth, checkRole('client'), async (req, res) => {
    try {
        const newAsset = new Asset(req.body);
        await newAsset.save();
        res.status(201).send(newAsset);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to get all assets
router.get('/assets', auth, checkRole('client'), async (req, res) => {
    try {
        const assets = await Asset.find();
        res.status(200).send(assets);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to update an asset
router.put('/assets/:id', auth, checkRole('superuser'), async (req, res) => {
    try {
        const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!asset) {
            return res.status(404).send();
        }
        res.send(asset);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to delete an asset
router.delete('/assets/:id', auth, checkRole('superuser'), async (req, res) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params.id);
        if (!asset) {
            return res.status(404).send();
        }
        res.send(asset);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
