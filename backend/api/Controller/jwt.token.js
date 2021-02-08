var jwt  = require('jsonwebtoken');

module.exports = {
    generateAccessTokenforUser: (user)=>{
       return jwt.sign({
            userId: user.id,
            username : user.username,
            email: user.email,
            isAdmin : user.isAdmin
        },process.env.JWT_SECRET_SIGN_KEY,
        {
            algorithm:"HS256",
            expiresIn:process.env.ACCESS_TOKEN_LIFE
        });
    },

    generateRefreshTokenforUser: (user) =>{
        return jwt.sign({
            userId: user.id,
            username : user.username,
            email: user.email,
            isAdmin : user.isAdmin
        },process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm:"HS256",
            expiresIn:process.env.REFRESH_TOKEN_LIFE
        });
    },

    // method to be used to verify user access token 
    // to call before the routeHandler in the api-routes.js f.e 
    // router.route(user/info).get(verify,userPersonalInfo)
    verifyTokenOfUser: (req,res,next) =>{
        let UserAccesToken = req.body.token;
        
        if(!UserAccesToken){
            return res.status(403).send();
        }else{
            let verifyToken 
            try {
                verifyToken = jwt.verify(UserAccesToken,process.env.JWT_SECRET_SIGN_KEY);
                //console.log(verifyToken);
                next();
            } catch (error) {
                return res.status(401).send("Failed to match Access Token the payload has been tampered with");
            }
        }
    },


};