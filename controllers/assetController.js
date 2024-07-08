const Asset = require('./models/asset');

exports.registerAsset = async (req, res) => {
  try {
    const newAsset = new Asset(req.body);
    await newAsset.save();
    // Emit real-time update
    const io = req.app.get('socketio');
    io.emit('assetRegistered', newAsset);

    res.status(201).send(newAsset);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!asset) {
      return res.status(404).send();
    }
    // Emit real-time update
    const io = req.app.get('socketio');
    io.emit('assetUpdated', asset);
    res.send(asset);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) {
      return res.status(404).send();
    }
    // Emit real-time update
    const io = req.app.get('socketio');
    io.emit('assetDeleted', asset);
    res.send(asset);
  } catch (error) {
    res.status(500).send(error);
  }
};
