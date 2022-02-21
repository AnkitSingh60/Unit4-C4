require("dotenv").config();
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const newToken = (user) => {
    return jwt.sign({ user}, process.env.JWT_SECRET_KEY);
}


const register = async (req,res) => {
    try {
        let user = await User.findOne({email: req.body.email}).lean().exec();

        if(user) 
        return res.send({Message:"Please another email"})
        user = await User.create(req.body);
        const token = newToken(user)
        res.send({user,token})
    } catch (error) {
        console.log('error:', error)
        
    }
}


const login = async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email})

        if(!user) return res.send({Message: "Either the email or the password you entered is not correct"})
        const match = user.checkPassword(req.body.password) 
        if(!match) return res.send({Message: "Either the email or the password you entered is not correct"}) 
        const token = newToken(user)
        res.send({user,token})

    } catch (error) {
        console.log('error:', error)
        
    }
}

module.exports = {register,login}