const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema(
  {
    
    Data:{
        type: Array
    }
   
  },
  { collection: "csv", timestamp: true }
);

const model = mongoose.model("csvSchema", csvSchema);

module.exports = model;
