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

router.get('/read', async(req, res) => {
    const {id} = req.body
    try{
        const csv = await CSV.findOne({_id:id})
    return res.json({ status: "ok", csv_data: csv });
    }catch(e){
        return res.json({ status: "error", error: e });
    }
    
})


router.post('/update', async(req, res) => {
    const {id,uniqueID, newEntry} = req.body
    const csv = await CSV.findOne({ _id:id }).lean();
    for(let x in csv.Data){
        console.log(csv.Data[x].Period)
        return
    }
})


router.post('/delete-csv', async(req, res) => {
    const {id} = req.body
    try{
        await CSV.deleteOne({_id:id})
        return res.json({ status: "ok", msg:"CSV successfully deleted"});
    }catch(e){
        return res.json({ status: "error", error: e }); 
    }
    
})
router.post('/delete-content', async(req, res) => {
    const {id,uniqueID } = req.body
    
})

module.exports = router