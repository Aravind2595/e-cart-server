//import express
const express = require("express");
//router()
const router = new express.Router();

//import product controller
const productController = require("../controllers/productController");

//import wishlist controller
const wishlistController = require("../controllers/wishlistController");

//import cart controller
const cartController = require("../controllers/cartController");

//get-all products
//router.http_request(path,(call back to define logic to resolve api))
router.get("/products/get-all-products", productController.getallproducts);

//router for view single product
router.get("/products/:id", productController.viewProduct);

//router for add to wishlist
router.post("/products/add-to-wishlist", wishlistController.addToWishlist);

//router for get all wishlist items
router.get("/wishlist/get-all-items", wishlistController.getAllWishlistItems);

//router for removing an item from wishlist
router.delete(
  "/wishlist/remove-item/:id",
  wishlistController.removeWishlistItem
);

//router for adding item to cart
router.post("/products/add-to-cart", cartController.addToCart);

//router for get all cart items
router.get("/cart/get-all-items", cartController.getCartItems);

//router for removing item from cart
router.delete("/cart/item/:id", cartController.removeCartItem);

//router for incrementing cart item quantity
router.get("/cart/increment-item/:id", cartController.incrCartItem);

//router for decrementing cart item quantity
router.get("/cart/decrement-item/:id", cartController.decrCartItem);

//router for empty cart
router.delete("/cart/empty-cart", cartController.emptyCart);

//export router
module.exports = router;
