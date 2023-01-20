const User = require("../models/User")
const router = require("express").Router()
const bcrypt = require("bcrypt")

router.post("/register", async(req, res)=>{
    
    try{
        //generate a hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //Create a new user
        const newuser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        //save and return response
        const user = await newuser.save()
        res.status(200).json(user)
    }catch(err){
        res.status(500).send(err)
    }
})

//Login
router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(404).send("user not found")

        const isValid = await bcrypt.compare(req.body.password, user.password)
        !isValid && res.status(400).send("wrong password")

        res.status(200).json(user)
    }catch(err){
        res.status(500).send(err)
    }
})

module.exports = router