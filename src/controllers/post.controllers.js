const express = require("express");
const Post = require("../models/post.model");
const router = express.Router();
  router.post("", async (req,res)=>{
    try {
        const post = await Post.create(req.body);
        return res.status(201).send(post);
    } catch (error) {
        return res.status(500).send(err.message);
    }
})


