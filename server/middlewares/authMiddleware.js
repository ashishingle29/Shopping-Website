import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//protected routes based on token
export const requireSignIn = async(req,res,next)=>{
    // return next();
    try {
        const decodedToken=JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decodedToken;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong!"
        })
    }
}
//admin access
export const checkAdmin=async(req,res,next)=>{
    // return next();
    try {
        const user=await userModel.findById(req.user._id);
        if(user.role<1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized access!"
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong!"
        })
    }
}
