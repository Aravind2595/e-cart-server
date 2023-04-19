//import cartitems collection/model
const cartitems = require("../models/cartSchema");

//to add items to cart
exports.addToCart = async (req, res) => {
  //to get product properties from request body
  const { id, title, price, image, quantity } = req.body;
  //logic
  try {
    //chcek product is already in cart
    const product = await cartitems.findOne({ id });
    if (product) {
      //product already in cart
      //increment quantity
      product.quantity += 1;
      //update total price fromthe product
      product.grantTotal = product.price * product.quantity;
      //to save changes in mongo db
      await product.save();
      //send res to client
      res.status(200).json("Items added to your cart..");
    } else {
      //product is not in the cart
      //add product to cart
      const newProduct = cartitems({
        id,
        title,
        price,
        image,
        quantity,
        grantTotal: price,
      });
      //to save changes in mongo db
      await newProduct.save();
      //send res to client
      res.status(200).json("Item added to your cart...");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//getcartItems
exports.getCartItems = async (req, res) => {
  //logic
  try {
    const allItems = await cartitems.find();
    //send allItems to client
    res.status(200).json(allItems);
  } catch (error) {
    res.status(401).json(error);
  }
};

//removeItem from cart
exports.removeCartItem = async (req, res) => {
  //get id of product should be removed
  const { id } = req.params;
  //logic
  try {
    const removeItem = await cartitems.deleteOne({ id });
    if (removeItem) {
      //get remaining items other than deleted one
      const allItems = await cartitems.find();
      res.status(200).json(allItems);
    } else {
      res.status(400).json("Item is not available in the cart");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//increment cart item
exports.incrCartItem = async (req, res) => {
  const { id } = req.params;
  //logic
  try {
    const item = await cartitems.findOne({ id });
    if (item) {
      item.quantity += 1;
      item.grantTotal = item.quantity * item.price;
      await item.save();
      //get all items from cart
      const allItems = await cartitems.find();
      res.status(200).json(allItems);
    } else {
      res.status(400).json("Item is not available in the cart");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//decrement cart item
exports.decrCartItem = async (req, res) => {
  const { id } = req.params;
  //logic
  try {
    const item = await cartitems.findOne({ id });
    if (item) {
      item.quantity -= 1;
      if (item.quantity == 0) {
        //remove item from cart
        const deleteItem = await cartitems.deleteOne({ id });
        if (deleteItem) {
          //get all items from cart
          const allItems = await cartitems.find();
          res.status(200).json(allItems);
        } else {
          res.status(400).json("Item is not available in the cart");
        }
      } else {
        item.grantTotal = item.quantity * item.price;
        await item.save();
        //get all items from cart
        const allItems = await cartitems.find();
        res.status(200).json(allItems);
      }
    } else {
      res.status(400).json("Item is not available in the cart");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//empty cart
exports.emptyCart = async (req, res) => {
  try {
    const result = await cartitems.deleteMany({});
    res.status(200).json("Your cart is empty");
  } catch (error) {
    res.status(401).json(error);
  }
};
