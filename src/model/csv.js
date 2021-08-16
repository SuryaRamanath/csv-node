const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema(
  {
    Data: {
      type: Array,
      required: true,
    },
  },
  { collection: "csv", timestamp: true }
);

const model = mongoose.model("csvSchema", csvSchema);

module.exports = model;
