const { User } = require("../../models");

const { HttpError, ctrlWrapper } = require("../../helpers");

const updateTheme = async (req, res) => {
  const { _id } = req.user;

  const newUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!newUser) {
    throw HttpError(404);
  }
  res.json({ theme: newUser.theme });
};

module.exports = {
  updateTheme: ctrlWrapper(updateTheme),
};
