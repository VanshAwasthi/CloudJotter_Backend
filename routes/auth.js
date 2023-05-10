const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

//router.(dot) karke isleye likh rhe hai kyo ki ye ek particular route ke leye hai
router.post('/',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid Email').isEmail(),
    body('password','Make a stronger password aleast 5 character').isLength({min :5})
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
    res.json({error : 'Please enter a unique value for email', message: err.message})})

})


module.exports = router