// utils/logActivity.js
const Activity = require('../models/activity'); // adjust the path as needed

const logActivity = async (description, userId) => {
  try {
    const activity = new Activity({
      description,
      user: userId
    });
    await activity.save();
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

module.exports = logActivity;
