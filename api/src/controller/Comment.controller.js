import CommentModel from '../model/Comment.model.js';
import PostModel from '../model/Post.model.js';

// Add comment
const addCommentController = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const postId = req.body.postId;
        const desc = req.body.desc;

        const comment = await new CommentModel({userId, postId, desc});
        const newComment = await comment.save();

        res.status(200).json({  success: true, newComment})
        next();
    }catch(err){
        res.status(500).send({success: false, message: "fail", err: err.message});
    }
}

//get comment
const GetCommentController = async (req, res, next) => {
    try{
        const postId = req.body.postId;
        const getComment = await CommentModel.find({postId: postId})
        res.status(200).json({  success: true, getComment})
        next();
    }catch(err){
        res.status(500).send({success: false, message: "fail", err: err.message});
    } 
}

export {GetCommentController, addCommentController}