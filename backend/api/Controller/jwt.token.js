var jwt  = require('jsonwebtoken');

module.exports = {
    generateAccessTokenforUser: (user)=>{
       return jwt.sign({
            username : user.username,
            email: user.email,
            isAdmin : user.isAdmin
        },process.env.JWT_SECRET_SIGN_KEY,
        {
            algorithm:"HS256",
            expiresIn:'1h'
        });
    },

    generateRefreshTokenforUser: (user) =>{
        return jwt.sign({
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
    verifyToken: (req, res, next) => {

        if (!req.headers['authorization']) {
            return res.status(403).send({
                error: "access route unauthorized"
            });
        } else {
            const UserAccesToken = req.headers['authorization'].split(' ')[1];
            console.log(UserAccesToken);
            jwt.verify(UserAccesToken, process.env.JWT_SECRET_SIGN_KEY, (err, payload) => {
                if (err) {
                    return res.status(403).send({
                        error: "access route unauthorized"
                    });
                } else {
                    req.payload = payload;
                    console.log(payload);
                    console.log(req.payload);
                    next();
                }
            });
        }
    },


    refreshToken : (req, res) => {
        let UserAccesToken = req.headers['authorization'].split(' ')[1];
    
        if (!UserAccesToken) {
            return res.status(403).send("missed field : token not found in cookie");
        } else {
            console.log(req.payload);
    
                jwt.verify(UserAccesToken, process.env.JWT_SECRET_SIGN_KEY,(err,payload) =>{
                    if(err){
                        return res.status(401).send("Failed to match Access Token the payload has been tampered with");
                    }else{
                        console.log(payload);
                    }
        
                });
            
    
            /*let refreshToken;
    
            models.user.findOne({
                attribute: ['refreshToken'],
                where:{
                    email : req.body.email
                }
            }).then((token) =>{
                refreshToken = token;
            }).catch((error) =>{
                return res.status(500).send("DB request failed could not retrieve refresh token");
            });
    
            try{
                jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
            }catch(err){
                return res.status(401).send("failed to verify refresh Token");
            }
    
            let newUserToken = jwt.sign(verifiedTokenPayload,process.env.REFRESH_TOKEN_SECRET,
            {
                algorithm:"HS256",
                expiresIn:process.env.JWT_SECRET_SIGN_KEY
            });
    
            */
            
            //res.cookie("jwt",newUserToken,{httpOnly:true});
            res.status(201).send({token : newUserToken ,message :"token refreshed successfully"});
        }
    },
};