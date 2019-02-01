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
    trim: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  zipCode: {
    type: Number
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