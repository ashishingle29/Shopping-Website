

import carouselModel from "../models/carouselModel.js";
import fs from 'fs';
import productModel from "../models/productModel.js";

//add carousel item::::::::
//takes caption from req.field and photo from req.file
export const addCarouselController=async(req,res)=>{
  try {
    const {caption}=req.fields;
    const {photo}=req.files;
    console.log(req.fields);
    if(!caption)
      return res.status(200).send({success:false,message:"Caption is required"});
    if(!photo)  
      return res.status(200).send({success:false,message:"Photo is required"});

    const carousel= new carouselModel({...req.fields});
    carousel.photo.data=fs.readFileSync(photo?.path);
    carousel.photo.contentType=photo?.type;
    await carousel.save();
    res.status(200).send({success:true,message:"Carousel item added successfully",carousel});
  } catch (error) {
    console.log(error);
    res.status(500).send({success:false,message:"Something went wrong."});
  }
}

//update carousel item::::::::
//takes _id from req.params, caption from req.field and photo from req.file
export const updateCarouselController=async(req,res)=>{
  try {
    const {caption}=req.fields;
    const {photo}=req.files;
    console.log(req.fields);
    // if(!caption)
    //   return res.status(200).send({success:false,message:"Caption is required"});
    // if(!photo)  
    //   return res.status(200).send({success:false,message:"Photo is required"});
    
    const carousel=await carouselModel.findById(req.params.id);
    if(!carousel)
      return res.status(200).send({success:false,message:"Carousel item not found"});
    if(caption)
      carousel.caption=caption;
    if(photo){
      carousel.photo.data=fs.readFileSync(photo?.path);
      carousel.photo.contentType=photo?.type;
    }
    await carousel.save();
    res.status(200).send({success:true,message:"Carousel item updated successfully",carousel});
  } catch (error) {
    console.log(error);
    res.status(500).send({success:false,message:"Something went wrong."});
  }
}

//get carousel photo
export const getCarouselPhotoController = async (req, res) => {
  try {
      const carousel = await carouselModel
      .findById(req.params.id)
      .select("photo");
      if (!carousel.photo.data)
          res.status(404).send({ success: false, message: "Carousel item not found!" });
        
      res.set('Content-type',carousel.photo.contentType);
      res.status(200).send(carousel.photo.data);
  } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "Something went wrong!" });
  }
};

//get all carousel items
export const getCarouselItemsController=async(req,res)=>{
  try {
    const items=await carouselModel.find().select('-photo');
    res.status(200).send({success:true,items});
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong!" });
  }
}

//delete carousel item
//takes id from req.params
export const deleteCarouselItemController=async(req,res)=>{
  try {
    const {id}=req.params;
    const delCarItem=await carouselModel.findByIdAndDelete(id);
    if(delCarItem){
      res.status(200).send({success:true,message:"Carousel item deleted successfully."});
    }else{
      res.status(200).send({success:false,message:"Error deleting carousel item."});
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong!" });
  }
}
