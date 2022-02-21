require("dotenv").config()
const jwt = require("jsonwebtoken");
const verifyToken = (token) =>{
    return new Promise((resolve, reject) => {
        jwt.verify(token,process.env.JWT_SECRET_KEY, (err,user) =>{
            if(err) return reject(err)

            resolve(user)
        })
    })
}

const authenticate = async (req,res,next)=>{

    if(! req.headers.authorization) 
    return res.send({Message: "authorization token is not valid"})

    if(! req.headers.authorization.startsWith("Bearer ")) 
    return res.send({Message: "authorization token is not valid"})

    const token = req.headers.authorization.split(" ")[1]

    let user;
    try {
         user = await verifyToken(token)
    } catch (error) {
        console.log('error:', error)
    }
    req.user = user.user;
    console.log('user:', req.user)













    return next()
}
module.exports= authenticate