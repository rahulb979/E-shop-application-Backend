const express = require("express");
const app = express();

// const bodyParser = require('bodyParser');

const morgan = require("morgan");

const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

// const productsRouter = require("./routers/product");

//

// middleware
// app.use(bodyParser.json());

// MiddlewWare

// use it instead of body parser
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "public/uploads"));
app.use(errorHandler);

// Router require

const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.API_URl;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// http://localhost:3000/api/v1/products

// Connecting to the database

mongoose
  .connect("mongodb://localhost:27017/eshop-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now..." + err);
    process.exit();
  });

const port = 3000;

app.listen(port, () => {
  console.log(api);
  console.log("server is running at http://localhost:3000");
});
