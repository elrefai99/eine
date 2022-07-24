import PostModel from "../model/Post.model.js";
import UserModel from "../model/User.model.js";


// Create a new Post
const CreatePostController = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const desc = req.body.desc;
        const img = req.body.img;

        const newPost = await new PostModel({userId, desc, img});
        const savePost = await newPost.save();

        res.status(200).json({ success: true, message: "Post created", savePost });
    
        next();
    }catch(error){
        res.status(500).send({success: false, message: "fail", err: error.message}); 
    }
}

// Update a post
const UpdatePostController = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const userIdPost = await PostModel.findById(req.params.id);
        
        if(userIdPost.userId === userId){
            const getPost = await PostModel.updateOne({ $set: req.body });
            res.status(200).json(getPost);
        }else{
            res.status(403).json("you can update only your post");
        }
        next();
    }catch(error){
        res.status(500).send({success: false, message: "fail", err: error.message}); 
    }
}

//delete a post
const DeletePostController = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const UserPostID = await PostModel.findById(req.params.id);
        if(UserPostID.userId === userId){
            await PostModel.findByIdAndDelete(req.params.id);

            res.status(200).json({success: true, message: 'User deleted Post successfully'});
        }else{
            res.status(403).json("you can delete only your post");
        }
        next();
    }catch(error){
        res.status(500).send({success: false, message: "fail", err: error.message}); 
    }
}

//like / dislike a post
const LikePostController = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const PostID = await PostModel.findById(req.params.id);
        if(!PostID.likes.includes(userId)){
            await PostID.updateOne({ $push: { likes: userId } });
            res.status(200).json("The post has been liked");
        }else{
            await PostID.updateOne({ $pull: { likes: userId } });
            res.status(200).json("The post has been disliked");
        }
        next();
    }catch(error){
        res.status(500).send({success: false, message: "fail", err: error.message}); 
    }
}


//get a post
const getPostIdController = async (req, res, next) => {
    try{
        const post = await PostModel.findById(req.params.id);

        res.status(200).json(post);

        next();
    }catch(err){
        res.status(500).send({success: false, message: "fail", err: err.message});

    }
}

//get timeline posts
const timelinePostController = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const currentUser  = await UserModel.findById(userId);
        const userPosts = await PostModel.find({ user_id: currentUser._id });

        const FriendshipsPost = await Promise.all(
            currentUser.followings.map((friendId) => {
                return PostModel.find({ userId: friendId });
            })
        );
        res.json(userPosts.concat(...FriendshipsPost))
    }catch(err){
        res.status(500).send({success: false, message: "fail", err: err.message});
    }
} 

export {CreatePostController, UpdatePostController, DeletePostController, LikePostController, getPostIdController, timelinePostController}