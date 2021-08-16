require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => console.log("Connected to db"))
  .catch((err) => console.log(err));
