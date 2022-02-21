const mongoose = require("mongoose");

const PostLikeSchema = new mongoose.Schema({
    body: {type:String, required:false},
    image: {type:String, required:false},
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
},
{
    timestamps:true,
    versionKey:false
}
)

const PostLike = mongoose.model("postLike", PostLikeSchema);
module.exports = PostLike