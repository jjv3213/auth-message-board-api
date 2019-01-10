const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const messages = require("./controllers/messages");

const app = express();

// db config
const db = require("./config/keys").mongoURI;
// connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/signin", signin.handleSignin(Joi, bcrypt));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, Joi, bcrypt);
});

app.get("/messages", (req, res) => {
  messages.handleGetMessages(req, res);
});

app.post("/messages", (req, res) => {
  messages.handlePostMessage(req, res);
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log("Listening on port", port);
});
