import express from "express";
import {requireSignIn, checkAdmin } from "../middlewares/authMiddleware.js";
import { createCategoryController, deleteCategoryController, getCategoriesController, getCategoryController, updateCategoryController } from './../controllers/categoryController.js';


const router=express.Router();

router.post('/create-category',requireSignIn,checkAdmin,createCategoryController);
router.put('/update-category',requireSignIn,checkAdmin,updateCategoryController);
router.delete('/delete-category/:id',requireSignIn,checkAdmin,deleteCategoryController);
router.get('/get-categories',getCategoriesController);
router.get('/get-category/:slug',getCategoryController);

export default router;

