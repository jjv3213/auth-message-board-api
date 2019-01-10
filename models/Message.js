const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const messages = mongoose.model("messages", MessageSchema);

module.exports = messages;
