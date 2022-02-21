const express = require("express");
const connect = require("./config/db")
const userController = require("./controllers/user.controller");
const {register,login} = require("./controllers/auth.controller")
const app = express();
app.use(express.json())
app.post("/register", register)
app.post("/login", login)
app.use("/users", userController);
// app.use("/users", userController);


 app.listen(2345, async () => {
    try {
        await connect()
    } catch (error) {
        console.log('error:', error)
        
    }
     console.log("Listening on port 2345");
 })