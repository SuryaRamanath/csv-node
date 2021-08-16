require("dotenv").config({ path: "./.env" });
const express = require("express");
require("./connect/mongoose");
var bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



const saveRouter = require('./router/csv')

app.use(saveRouter) 


const port = process.env.PORT || 2000;

app.listen(port, "0.0.0.0", () => {
  console.log("Server is up on port " + port);
});