var jwt  = require('jsonwebtoken');

module.exports = {
    generateTokenforUser: (user)=>{
       return jwt.sign({
            userId: user.id,
            username : user.username,
            isAdmin : user.isAdmin
        },process.env.JWT_SECRET_SIGN_KEY,
        {
            expiresIn:'2h'
        });
    },

    refreshTokenforUser: (user) =>{

    }
};