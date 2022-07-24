import bcrypt from 'bcrypt';
import UserModel from '../model/User.model.js';

// Get User
const GetUser = async (req, res, next) => {
    try{
        const userId = req.user.id;
        
        const userFind = await UserModel.findById(userId);
        const {password, isAdmin, ...other} = userFind._doc

        // Display User data
        res.status(200).json({success: true, message: "Success", userFind: other})

        next();
    }catch(error){
        res.status(500).send({success: false, message: "fail", err: error.message}); 
    }
}

// Update User

// Delete User
const DeleteUserController = async (req, res, next) => {
    try{
        const userId = req.user.id;
        await UserModel.findByIdAndDelete(userId);

        res.status(200).json({success: true, message: "Success", delete: "User is deleted successfully"})
        
        next();
    }catch(error){
        res.status(500).send({success: false, message: "fail", err: error.message}); 
    }
}

// following User
const FollowUserController = async (req, res, next) => {
    
    const userId = req.user.id;
        if(userId !==  req.params.id){
            try{
                const user = await UserModel.findById(req.params.id);
                const followerID = await UserModel.findById(userId);
                
                if(!user.followers.includes(userId)){
                    await user.updateOne({$push: {followers: userId}});
                    await followerID.updateOne({$push: {followings: req.params.id}});

                    res.status(200).json({success: true, message: "Success Follow!"});
                }else{
                    res.status(403).json("you already follow this user");
                }
            }catch(error){
                res.status(500).send({success: false, message: "fail", err: error.message}); 
            }
        }else{
            res.status(403).json("you cant follow yourself");
        }
}

// unfollow a user

const UnfollowUserController = async (req, res, next) => {
    const userId = req.user.id;
    if(userId !== req.params.id){
        try{
            const user = await UserModel.findById(req.params.id);
            const UnfollowerID = await UserModel.findById(userId);
            if(user.followers.includes(userId)){
                await user.updateOne({
                    $pull: {
                        followers: userId 
                    }
                })
                await UnfollowerID.updateOne({
                    $pull: {
                        followings: req.params.id 
                    } 
                })

                res.status(200).json("user has been unfollowed");

                next();
            }else{
                res.status(403).json("you dont follow this user");
            }
        }catch(error){
            res.status(500).send({success: false, message: "fail", err: error.message}); 
        }
    }else{
        res.status(403).json("you cant unfollow yourself");
    }   
}

// Search
const SearchController = async (req, res, next) => {
    const query = req.query.q;;
    try{
        const User = await UserModel.find({
            fullName:{
                title: { $regex: query, $options: "i" }
            }
        }.limit(40));
        res.status(200).json(User)
    }catch(err){
        res.status(500).send({success: false, message: "fail", err: err.message});
    }
}

export {GetUser, DeleteUserController, FollowUserController, UnfollowUserController, SearchController}