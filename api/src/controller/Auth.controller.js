import { TokenId, maxAge } from '../util/jwt.util.js'
import bcrypt from 'bcrypt';
import UserModel from '../model/User.model.js'
import validator from 'validator';

// Register
const RegisterController = async (req, res, next) => {
    try{
        const {firstName, lastName, email, password} = req.body;

        // HandelErrors
        const findEmail = await UserModel.findOne({email: email}); // if email is already in use
        if(findEmail){
            throw new Error('Email already in use');
        }
        // Hash Password
        const salt = await bcrypt.genSaltSync(10);
        const HashPassword = await bcrypt.hash(password, salt);

        const fullName = firstName + ' ' + lastName;

        // Create User
        const user = await UserModel({firstName, lastName, fullName, email, password: HashPassword});
        const newUser = await user.save();
        res.status(200).json({success: true, message: "Success", newUser})

        next();
    }catch(e){
        res.status(500).send({success: false, message: "fail", err: e.message}); 
    }
}

// Login
const LoginController = async (req, res, next) => {
    try{
        const email = req.body.email;
        const userFind = await UserModel.findOne({email: email});
        if(!userFind){
            throw new Error('Email not found');
        }
        const passwordFind = await bcrypt.compare(req.body.password, userFind.password);

        if(userFind){
            // Add Token
            const token = TokenId(userFind.id);
            userFind.token = token;
            // Display Data
            res.status(200).json({success: true, message: "Success", userFind  })
        }
    }catch(error){
        res.status(500).send({success: false, message: "fail", err: error.message}); 
    }
}

export {RegisterController, LoginController}