const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  message: {
    type: String,
    trim: true
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});





const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;