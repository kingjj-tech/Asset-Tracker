const AssetHistory = require('./models/assetHistory');

exports.registerAssetHistory = async (req, res) => {
  try {
    const newAssetHistory = new AssetHistory(req.body);
    await newAssetHistory.save();
    res.status(201).send(newAssetHistory);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllAssetHistories = async (req, res) => {
  try {
    const assetHistories = await AssetHistory.find();
    res.status(200).send(assetHistories);
  } catch (error) {
    res.status(500).send(error);
  }
};