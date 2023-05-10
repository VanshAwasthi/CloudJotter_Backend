const express = require('express')
const router = express.Router()
const User = require('../models/User')

//router.(dot) karke isleye likh rhe hai kyo ki ye ek particular route ke leye hai
router.post('/',(req,res)=>{
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
})


module.exports = router