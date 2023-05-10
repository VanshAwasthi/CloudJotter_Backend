const express = require('express')
const router = express.Router()

//router.(dot) karke isleye likh rhe hai kyo ki ye ek particular route ke leye hai
router.get('/',(req,res)=>{
    res.json([]);
})


module.exports = router