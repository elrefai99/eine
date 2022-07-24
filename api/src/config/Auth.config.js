import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.cookies.token || req.headers['token'];

    if(token){
        try{
            const getId = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = getId;
        }catch(err){
            res.status(500).send(err.message)
        }
    }else{
        console.log("Authentication failed")
    }

    return next();
}

export default verifyToken;