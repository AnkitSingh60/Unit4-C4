const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    body: {type:String, required:false},
    likes: {type:Number, required:false, default:"0"},
    image: {type:String, required:false},
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
    // commentId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "comment",
    //     required: true
    // },
},
{
    timestamps:true,
    versionKey:false
}
)

const Post = mongoose.model("post", postSchema);
module.exports = Post