import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

//create category::::::::::::::
//takes name from req.body
export const createCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            return res.status(401).send({success:false,message:"category name is required"});
        }

        const categoryExist=await categoryModel.findOne({name});
        if(categoryExist){
            return res.status(200).send({
                success:true,
                message:"Category already exists"
            });
        }
        const category=await new categoryModel({name,slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:"Category created successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Something went wrong!"
        });
    }
}

//update category::::::::::::::
//takes _id,name from req.body
export const updateCategoryController=async(req,res)=>{
    try {
        const {id,name}=req.body;
        if(!name){
            return res.status(401).send({success:false,message:"category name is required"});
        }
        const updateCat=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        
        if(!updateCat){
            return res.status(404).send({success:false,message:"category not found"});
        }
        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            updateCat
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Something went wrong!"
        });
    }
}

//get all categories:::::::::::::::
//no parameters required 
export const getCategoriesController= async (req,res)=>{
    try {
        const categories=await categoryModel.find();
        res.status(200).send({
            success:true,
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:"something went wrong"});
    }
}

//get single categories:::::::::::::::
//slug from req.params required 
export const getCategoryController= async (req,res)=>{
    try {
        const categories=await categoryModel.findOne({slug:req.params.slug});
        if(!categories){
            return res.status(404).send({
                success:true,
                message:"category not found!"
            })
        }
        res.status(200).send({
            success:true,
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:"something went wrong"});
    }   
}


//delete single category:::::::::::::::
//id from req.params required 
export const deleteCategoryController= async (req,res)=>{
    try {
        const categories=await categoryModel.findByIdAndDelete(req.params.id);
        console.log(categories)
        if(!categories){
            return res.status(404).send({
                success:true,
                message:"category not found!"
            })
        }
        res.status(200).send({
            success:true,
            message:"Deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:"something went wrong"});
    }
}
