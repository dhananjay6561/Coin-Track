import asyncHandler from 'express-async-handler';

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    whatsappNumber: user.whatsappNumber,
  });
});
