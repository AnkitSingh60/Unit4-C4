const path = require("path");
const express = require("express");
const upload = require("../middlewares/fileUploads")
const User = require("../models/user.model");
const router = express.Router();


// for single file uploads

router.post("/single", upload.single("profile_pic") , async (req,res)=>{
    try {
        const user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        email: req.body.email,
        profile_pic: req.file.path,
        });

        return res.send(user)
        
    } catch (error) {
        console.log('error:', error)
        
    }
})
// for multiple file uploads
router.post("/multiple", upload.any("profile_pic"), async (req,res)=>{
    try {
        const filePaths = req.files.map((file) => file.path)

        const user = await User.create({
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        profile_pic: filePaths

        });
        return res.send(user)
    } catch (error) {
        console.log('error:', error)
    }
})

router.post("",  async (req, res) => {
    try {
      req.body.user_id = req.user._id;
      const user = await User.create(req.body);
  
      return res.send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  
  router.get("", async(req,res)=>{
    try {
        const page = req.query.page || 1;
        const size = req.query.size || 10;
        const totalPages = Math.ceil((await User.find().countDocuments())/size);
        const user = await User.find().skip((page-1)*size).limit(size)
        .lean().exec();
        return res.send({user,totalPages})
    } catch (error) {
        console.log('error:', error)
    }
})



module.exports = router

