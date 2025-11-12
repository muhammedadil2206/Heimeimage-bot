const User = require('../models/User');

exports.getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('prompts');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      prompts: user.prompts || [],
    });
  } catch (error) {
    console.error('History fetch error:', error);
    return res.status(500).json({ message: 'Failed to fetch history' });
  }
};

