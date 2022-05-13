const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register Api User

router.post("/register", async (req,res)=>{
    try{
        //genrate password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);

        //create a new user

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass ,
        })
        const user = await newUser.save();
        res.status(201).json({
            "msg":"Account Created Successfull",
            "user":user,
        })

    }catch(err){
        res.status(500).json(err);
    }
})

//Loign 
router.post("/login", async (req,res)=>{
    try{
        //genrate password
        
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("User not Found!");

        const validPass = await bcrypt.compare(req.body.password, user.password);
        !validPass && res.status(422).json("Wrong Credentials");

        const {password,...others} = user._doc;
        res.status(201).json({
            "msg":"Logged in Successfully!!",
            "user":others,
        });

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router