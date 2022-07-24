import mongo from 'mongoose';

const postSchema = new mongo.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        max: 1000,
    },
    img:{
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    }
},{ 
    timestamps: true 
});

const PostModel = mongo.model('post', postSchema);

export default PostModel;