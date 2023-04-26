import express from "express";
import { registerController,loginController, testController, verifyForgotPassword,resetForgotPassword, getOrdersController, manageOrdersController, orderStatusController, getUsersController, deleteUserController, promoteUserController, demoteUserController } from "../controllers/authController.js";
import { checkAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import {  updateProfileController } from './../controllers/authController.js';

const router=express.Router();

router.post("/register",registerController);
router.post("/login", loginController);

router.post('/forgot-password',verifyForgotPassword);
router.put('/forgot-password',resetForgotPassword);

router.put('/update-profile',updateProfileController)


router.get('/orders',requireSignIn,getOrdersController);
router.get('/manage-orders',requireSignIn,checkAdmin,manageOrdersController);
router.put('/order-status',requireSignIn,checkAdmin,orderStatusController);
router.get('/get-users',requireSignIn,checkAdmin,getUsersController);
router.delete('/delete-user/:id',requireSignIn,checkAdmin,deleteUserController);
router.put('/promote-user/:id',requireSignIn,checkAdmin,promoteUserController);
router.put('/demote-user/:id',requireSignIn,checkAdmin,demoteUserController);

router.get("/test",requireSignIn,checkAdmin,testController);


//protected routes:::::::::::
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
router.get("/admin-auth",requireSignIn,checkAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})
export default router;
