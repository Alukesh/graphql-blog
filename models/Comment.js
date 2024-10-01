const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    }
}, { timestamps })


module.exports = mongoose.model('comment', commentSchema)