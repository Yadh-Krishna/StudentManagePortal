
const express = require('express');
// require('dotenv').config();
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const app=express();

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true,limit:'10mb'}));
app.use(cookieParser());

app.use(express.static('uploads'));

app.get('/', (req, res) => {
    res.json({ message: 'Student Management Portal API' });
});

// app.get('*',(req,res)=>{
//     res.status(404).json({error:"Route not found"});
// })

module.exports=app;
