const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    body: {type:String, required:true},
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    commentId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment",
            required: true
        }
},
 
{
    timestamps:true,
    versionKey:false
}
)

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment