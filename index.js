//Loads .env file contents into process.env.
require("dotenv").config();

//import express
const express = require("express");

//import cors
const cors = require("cors");

//import connection.js file to connect mongoDB
require("./db/connection");

//import router
const router = require("./routes/router");

//const server appusing express
const server = express();

//Use cors and express.json() to your server app
//application specific middleware
server.use(cors());

server.use(express.json());

//use router in app
server.use(router);

//create port to listen your server app
const PORT = process.env.PORT || 3000;

//api test
server.get("/", (req, res) => {
  res.status(200).json({ message: "E Cart server Started" });
});

//Run/Listen server app in the specified port
server.listen(PORT, () => {
  console.log(`E cart server started at port:${PORT}`);
});
