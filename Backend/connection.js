const mongoose = require("mongoose");
//Write missing code 
mongoose
  .connect('mongodb+srv://sreeharianilkumarrejithab21ec1260:sree123asd123@cluster0.yrykc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
