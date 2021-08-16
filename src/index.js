require("dotenv").config({ path: "./.env" });
const express = require("express");
const path = require("path");
require("./connect/mongoose");

const app = express();
app.use(express.json());


const port = process.env.PORT || 2000;

app.listen(port, "0.0.0.0", () => {
  console.log("Server is up on port " + port);
});