const express = require("express");

const router = express.Router();

const { updateTheme } = require("../../controllers/user");

const { validateBody } = require("../../middlewares");
const authenticate = require("../../middlewares/authenticate");

const { userSchemas } = require("../../models");

router.patch(
  "/theme",
  authenticate,
  validateBody(userSchemas.themeSchema),
  updateTheme
);

module.exports = router;
