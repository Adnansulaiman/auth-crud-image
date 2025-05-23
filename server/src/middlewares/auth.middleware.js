const User = require("../model/User");
const jwt = require('jsonwebtoken');


const protect  = async (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized access"});

    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.user?.id).select('-password');
        next();
    }catch(error){
        res.status(401).json({message:'Invalid token'})
    }
}

module.exports = {protect}