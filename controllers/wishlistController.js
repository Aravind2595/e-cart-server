//import wishlist collection/model
const wishlists = require("../models/wishlistSchema");

const cartitems = require("../models/cartSchema");

//logic to add ite to wishlist
exports.addToWishlist = async (req, res) => {
  //destructuring
  //emp={id:1,name:'Aravind'}
  //const {id,name}=emp
  //instead emp.id we use id
  //get product detail from req.body
  const { id, title, price, image } = req.body; //destructering
  //check product is already in wishlist
  try {
    const cartItem = await cartitems.findOne({ id });
    if (cartItem) {
      res.status(200).json("Item already added in your cart!!!");
    } else {
      const item = await wishlists.findOne({ id });
      //check product is already in wishlist
      if (item) {
        //product is available
        res.status(401).json("Item already present in your wishlist");
      } else {
        //product is not available.so add it
        const newProduct = new wishlists({
          id,
          title,
          price,
          image,
        });
        //save to db
        await newProduct.save();
        //send response to client
        res.status(200).json("Item added to your wishlist");
      }
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//get all item to wishlist
exports.getAllWishlistItems = async (req, res) => {
  //logic
  //to get all items from an collections
  try {
    const allItems = await wishlists.find();
    if (allItems) {
      res.status(200).json(allItems);
    } else {
      res.status(401).json("Your wish list is empty!!!");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//remove item from wishlist
exports.removeWishlistItem = async (req, res) => {
  //logic
  //get product id from request
  const { id } = req.params; //destructering
  //chcek id is collection
  try {
    const item = await wishlists.deleteOne({ id });
    if (item) {
      //get remaining items other than deleted one
      const allItems = await wishlists.find();
      res.status(200).json(allItems);
    } else {
      res.status(400).json("Item is not available in the wishlist");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
