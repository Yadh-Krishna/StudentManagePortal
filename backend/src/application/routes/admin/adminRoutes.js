import express from "express"

const router= express.Router();

router.put('/update',(req,res)=>{
    res.send("Hi I am update Router");
});

export default router;

