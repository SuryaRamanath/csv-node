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
    const {id,row, newEntry} = req.body
    
    try{
        const csv = await CSV.findOne({ _id:id }).lean();
        csv.Data[row] = newEntry
    const newcsv = await CSV.findOneAndUpdate({_id:id},{Data:csv.Data},{new:true})

        return res.json({ status: "ok", msg:"CSV successfully updated" ,new_csv:newcsv});
    }catch(e){
        return res.json({ status: "error", error: e }); 
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
    const {id,row } = req.body
    try{
        const csv = await CSV.findOne({ _id:id }).lean();
        csv.Data[row] = undefined
        
        const newcsv = await CSV.findOneAndUpdate({_id:id},{Data:csv.Data},{new:true})


        return res.json({ status: "ok", msg:"CSV successfully updated" ,new_csv:newcsv});

    }catch(e){
        return res.json({ status: "error", error: e }); 
    }
    
})

module.exports = router