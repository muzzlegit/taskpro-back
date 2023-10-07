const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const user = req.user;

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    avtarUrl: user.avatarURL,
    theme: user.theme,
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
