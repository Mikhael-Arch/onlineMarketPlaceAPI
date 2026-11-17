const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://okoriemichael66_db_user:Gson6DgFCRkRlYkE@cluster0.8uocpgk.mongodb.net/").then(() => {
    console.log("Db connection established");
  })
  .catch((error) => {
    console.log("Db connection failed: ", error.message);
  });