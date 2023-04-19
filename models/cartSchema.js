//define schema for cart
//import mongoose
const mongoose = require("mongoose");

//using mongoose define schema
const cartSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  grantTotal: {
    type: Number,
    required: true,
  },
});

//create model using the above schema
//model name shouldbe in small letters and plural form
const cartitems = mongoose.model("cartitems", cartSchema);

//export model
module.exports = cartitems;
