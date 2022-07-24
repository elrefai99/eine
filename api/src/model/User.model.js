import mongo from "mongoose";

const userSchema = new mongo.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    name:{
        type: String,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,

    },
    profilePicture: {
        type: String,
        default: "https://res.cloudinary.com/ebi-999/image/upload/v1656812197/user_rasdwh.jpg"
    },
    coverPicture: {
        type: String,
        default: "",
    },
    fromGoogle:{
        type: Boolean,
        default: false,
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        max: 50,
    },
    city: {
        type: String,
        max: 50,
    },
    from: {
        type: String,
        max: 50,
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    },
    token: {
        type: String,
    }
}, {
    timestamps: true
});

const UserModel = mongo.model('User', userSchema);

export default UserModel;