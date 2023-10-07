const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL, GMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: GMAIL,
    pass: GMAIL_PASSWORD,
  },
});

const sendEmail = async (data) => {
  const verifyEmail = { ...data, from: GMAIL };

  await transporter
    .sendMail(verifyEmail)
    .then()
    .catch((error) => console.log(error));
  return true;
};

module.exports = sendEmail;
