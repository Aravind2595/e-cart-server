//define schema for wishlist
//import mongoose
const mongoose = require("mongoose");

//using mongoose define schema
const wishlistSchema = mongoose.Schema({
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
});

//create model using the above schema
//model name shouldbe in small letters and plural form
const wishlists = mongoose.model("wishlists", wishlistSchema);

//export model
module.exports = wishlists;
