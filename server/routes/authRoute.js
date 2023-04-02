import express from "express";
import { registerController,loginController, testController, verifyForgotPassword,resetForgotPassword } from "../controllers/authController.js";
import { checkAdmin, requireSignIn } from './../middlewares/authMiddleware.js';

const router=express.Router();

router.post("/register",registerController);
router.post("/login", loginController);

router.post('/forgot-password',verifyForgotPassword);
router.put('/forgot-password',resetForgotPassword);

router.get("/test",requireSignIn,checkAdmin,testController);

//protected routes:::::::::::
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
router.get("/admin-auth",requireSignIn,checkAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})
export default router;
