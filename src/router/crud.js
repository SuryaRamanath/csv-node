const { default: CSVError } = require("csvtojson/v2/CSVError");
const express = require("express");
const router = new express.Router();
const CSV = require('../model/csv')

router.post('/create', async (req, res) => {
    const { id,entry } = req.body
    try{
        await CSV.findOneAndUpdate({_id:id},{$push:{Data:entry}})
        return res.json({ status: "ok", msg: "entry saved successfully.." });
    }catch(e){
        return res.json({ status: "error", error: e });
    }

})

router.post('/update', async(req, res) => {
    const {id,uniqueID, newEntry} = req.body
    
})

router.post('/update', async(req, res) => {
    const {id,uniqueID, newEntry} = req.body
    
})

router.post('/update', async(req, res) => {
    const {id,uniqueID, newEntry} = req.body
    
})

module.exports = router