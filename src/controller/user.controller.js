const express = require("express");
const router = express.Router();

const { body, validationResult } = require('express-validator');

const User = require("../models/user.model");

router.post('/',body("first_name").isLength({ min: 1 , max: 25}).withMessage("Wirte your first name"),
body("last_name").isLength({ min: 1 , max: 25}).withMessage("Wirte your last name"),
body("email").custom( async (value) => {

    

    const listOfDomain = ["gmail.com","yahoo.com"];

    const email = value.split("@");
    if(!listOfDomain.includes(email[1])){
        throw new Error("we don not accept email from this domain");
    }

    if(!isEmail){
        throw new Error("Please Enter a proper email address");
    }
    const productByEmail = await User.findOne({ email: value }).lean().exec();

    if(productByEmail){
        throw new Error("Please try with a different email address");
    }
    return true;
}),
body("password").custom(async (value) => {
    const pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
    if(!pass){
        throw new Error("Minimum eight characters, at least one letter and one number");
    }
    return true;
}),
body("age").custom( (value) => {
    const isNumber = /^[0-9]*$/.test(value);
    if(!isNumber || value <= 1 || value >= 100){
        throw new Error("age cannot be 0, above 100, regative or string");
    }
    return true;
}),
body("gender").custom(async (value) => {
    const genderList = ["Male", "Female", "Others"]

    if(!genderList.includes(value)) {
        throw new Error("Gender should be either Male, Female or Others and M,F,O must be capital");
    }
    return true;
}), async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let newErrors = errors.array().map(({ msg, param , location }) => {
            return {
                [param]: msg,
            }
        });
      return res.status(400).json({ errors: newErrors });
    }
    try{
        const user = await User.create(req.body);

        return res.status(201).json({ user });
    }catch(e){
        return res.status(500).json({ status: 'failed', message: e.message });
    }
})

module.exports = router;