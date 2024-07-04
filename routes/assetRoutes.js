const express = require('express');
const Asset = require('../models/asset');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const router = express.Router();

// Route to register a new asset
router.post('/', auth, checkRole('client'), async (req, res) => {
    console.log('POST /assets called');
    try {
        const newAsset = new Asset(req.body);
        await newAsset.save();
        res.status(201).send(newAsset);
    } catch (error) {
        res.status(400).send({ error: 'Failed to create asset', details: error.message });
    }
});

// Route to get all assets
router.get('/', auth, checkRole('client'), async (req, res) => {
    try {
        const assets = await Asset.find();
        res.status(200).send(assets);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch assets', details: error.message });
    }
});

// Route to update an asset
router.put('/:id', auth, checkRole('superuser'), async (req, res) => {
    try {
        const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!asset) {
            return res.status(404).send({ error: 'Asset not found' });
        }
        res.send(asset);
    } catch (error) {
        res.status(400).send({ error: 'Failed to update asset', details: error.message });
    }
});

// Route to delete an asset
router.delete('/:id', auth, checkRole('superuser'), async (req, res) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params.id);
        if (!asset) {
            return res.status(404).send({ error: 'Asset not found' });
        }
        res.send(asset);
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete asset', details: error.message });
    }
});

module.exports = router;
