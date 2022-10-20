const {verifyToken} = require('../jwt') ;

module.exports = (req,res,next) => {

    const authorisationHeader = req.headers['authorization'] ;
    if(!authorisationHeader) return res.sendStatus(401);

    const [type,token] = authorisationHeader.split(/\s+/) ;
    if(type !== "Bearer") return res.sendStatus(401);

    const user = verifyToken(token);
    if(!user) return res.sendStatus(401);

    req.user = user ;
    next();

}