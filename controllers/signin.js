const handleSignin = (Joi, bcrypt) => (req, res) => {
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

  if (result.error == null) {
    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then(result => {
          if (result) {
            res.json(user);
          } else {
            return res.status(400).json("Unable to login");
          }
        });
      } else {
        return res.status(400).json("Unable to login");
      }
    });
  } else {
    return res.status(400).json("Unable to login");
  }
};

module.exports = {
  handleSignin: handleSignin
};
