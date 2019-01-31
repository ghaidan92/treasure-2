const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  itemDescription: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String
  },
  location: {
    type: Number,
    required: true
  },
  catagories: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});





const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;