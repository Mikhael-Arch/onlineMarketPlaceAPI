const express = require("express");
require("./database");
const customerRoute = require("./routes/customerRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

const PORT = 5050;
const app = express();

app.use(express.json());
app.use(customerRoute);
app.use(productRoute);
app.use(orderRoute);

app.listen(PORT, () => {
  console.log("My app is running on port ", PORT);
});