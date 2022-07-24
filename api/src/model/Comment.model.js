import mongo from 'mongoose';

const commentSchema = new mongo.Schema({
    userId: {
        type: String,
        required: true
    },
    postId:{

    },
    desc: {
        type: String,
        max: 1000,
    },
},{ 
    timestamps: true 
});

const CommentModel = mongo.model('comment', commentSchema);

export default CommentModel;