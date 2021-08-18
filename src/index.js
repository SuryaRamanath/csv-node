require("dotenv").config({ path: "./.env" });
const express = require("express");
const path = require('path');
require("./connect/mongoose");
var bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const saveRouter = require("./router/csv");
const crudRouter = require("./router/crud");

app.use(saveRouter);
app.use(crudRouter);

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/Templates/index.html'));

});

const port = process.env.PORT || 2000;

app.listen(port, "0.0.0.0", () => {
  console.log("Server is up on port " + port);
});
