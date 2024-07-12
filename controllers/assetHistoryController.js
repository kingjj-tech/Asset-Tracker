const History = require('../models/history');

const createHistory = async (req, res) => {
  try {
    const { action, user, details } = req.body;
    const history = new History({ action, user, details });
    await history.save();
    res.status(201).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await History.find().populate('user', 'name email');
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createHistory,
  getHistory
};
