const Joi = require("joi");

// Load message model
const Message = require("../models/Message");

const schema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .required(),
  subject: Joi.string().required(),
  message: Joi.string()
    .max(500)
    .required()
});

const handleGetMessages = (req, res) => {
  Message.find().then(messages => {
    res.json(messages);
  });
};

const handlePostMessage = (req, res) => {
  if (!req.body.username) req.body.username = "Anonymous";

  const result = Joi.validate(req.body, schema);
  if (result.error == null) {
    const newMessage = new Message({
      username: req.body.username,
      subject: req.body.subject,
      message: req.body.message
    });
    newMessage.save().then(message => res.json(message));
  } else {
    return res.status(500).json("Unable to post message");
  }
};

module.exports = {
  handleGetMessages,
  handlePostMessage
};
