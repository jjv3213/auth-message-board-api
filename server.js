const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

// const register = require("./controllers/register");
// const signin = require("./controllers/signin");

const app = express();

const db = {
  users: [
    {
      id: "123",
      username: "johnny",
      password: "password"
    },
    {
      id: "124",
      username: "sally",
      password: "password"
    }
  ]
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(db.users);
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  if (username === db.users[0].username && password === db.users[0].password) {
    res.json("success");
  }
  res.status(400).json("failed");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  db.users.push({
    id: "125",
    username,
    password
  });
  res.json(db.users[db.users.length - 1]);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
