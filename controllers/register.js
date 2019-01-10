const handleRegister = (req, res, Joi, bcrypt) => {
  // Load user model
  const User = require("../models/User");

  const schema = Joi.object().keys({
    username: Joi.string()
      .regex(/(^[a-zA-Z0-9_]+$)/)
      .min(2)
      .max(10)
      .required(),
    password: Joi.string()
      .trim()
      .min(6)
      .required()
  });

  const result = Joi.validate(req.body, schema);

  if (result.error === null) {
    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        return res.status(400).json("username already exists");
      } else {
        bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {
          // insert the user with the hashed password
          const newUser = new User({
            username: req.body.username,
            password: hashedPassword
          });
          newUser.save().then(user => res.json(user));
        });
      }
    });
  } else {
    return res.status(400).json(result.error.message);
  }
};

module.exports = {
  handleRegister: handleRegister
};
