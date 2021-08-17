const express = require("express");
const router = new express.Router();
const csv = require("csv-parser");
const fs = require("fs");
const CSV = require("../model/csv");
const multer = require("multer");
const auth =  require('../validators/auth')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.root + "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//=================save csv data to database=============================
router.post("/save", upload.single("csvfile"),auth, async (req, res) => {
  const result = [];
  try {
    fs.createReadStream(process.env.root + "/uploads/" + req.file.filename)
      .pipe(csv({}))
      .on("data", (data) => result.push(data))
      .on("end", async () => {
        try {
          await CSV.create({ Data: result });
          console.log("pass");
          return res.json({ status: "ok", msg: "file saved successfully.." });
        } catch (e) {
          return res.json({ status: "error", error: e });
        }
      });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
});

module.exports = router;
