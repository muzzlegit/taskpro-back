const express = require("express");
const cors = require("cors");
const logger = require("morgan");

require("dotenv").config();

const { authRouter, userRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { message = "Server error", status = 500 } = err;
  res.status(status).json({ message });
});

module.exports = app;
