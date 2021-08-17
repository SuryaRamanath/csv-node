const express = require("express");
const router = new express.Router();
const CSV = require("../model/csv");
const auth =  require('../validators/auth')
//==================create a new entry to the csv======================
router.post("/create", auth,async (req, res) => {
  const { id, entry } = req.body;
  try {
    await CSV.findOneAndUpdate({ _id: id }, { $push: { Data: entry } });
    return res.json({ status: "ok", msg: "entry saved successfully.." });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
});
//=======================get the cs content============================
router.get("/read", auth,async (req, res) => {
  const { id } = req.body;
  try {
    const csv = await CSV.findOne({ _id: id });
    return res.json({ status: "ok", csv_data: csv });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
});
//============update the content of csv================================
router.post("/update", auth,async (req, res) => {
  const { id, row, newEntry } = req.body;

  try {
    const csv = await CSV.findOne({ _id: id }).lean();
    csv.Data[row] = newEntry;
    const newcsv = await CSV.findOneAndUpdate(
      { _id: id },
      { Data: csv.Data },
      { new: true }
    );

    return res.json({
      status: "ok",
      msg: "CSV successfully updated",
      new_csv: newcsv,
    });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
});
//====================delete the whole csv from database================
router.post("/delete-csv",auth, async (req, res) => {
  const { id } = req.body;
  try {
    await CSV.deleteOne({ _id: id });
    return res.json({ status: "ok", msg: "CSV successfully deleted" });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
});

//nullify a particular row in the csv=====================================
router.post("/delete-content",auth, async (req, res) => {
  const { id, row } = req.body;
  try {
    const csv = await CSV.findOne({ _id: id }).lean();
    csv.Data[row] = undefined;

    const newcsv = await CSV.findOneAndUpdate(
      { _id: id },
      { Data: csv.Data },
      { new: true }
    );

    return res.json({
      status: "ok",
      msg: "CSV successfully updated",
      new_csv: newcsv,
    });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
});

module.exports = router;
