const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign({id: user.id, email: user.email},
        process.env.JWT_SECRET,
        {algorithm: 'HS512',typ: 'JWT', expiresIn:'1w'},
    );
};

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET,{algorithm: 'HS512',typ: 'JWT'});
    } catch (err) {
        return null ;
    }
};