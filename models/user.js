const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const themeList = ["light", "violet", "dark"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    theme: {
      type: String,
      enum: themeList,
      default: "dark",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

// -------------JOI--------------------- //

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const themeSchema = Joi.object({
  theme: Joi.valid(...themeList).required(),
});
const userSchemas = {
  registerSchema,
  loginSchema,
  themeSchema,
};

module.exports = {
  User,
  userSchemas,
};
