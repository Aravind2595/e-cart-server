//define connection bewteen node and mongodb using mongoose

//import mongoose
const mongoose = require("mongoose");

//get connection string from env
const DB = process.env.DATABASE;

//connect  mongoDB
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Cart Database connected successfully!!");
  })
  .catch((error) => {
    console.log(error);
  });
