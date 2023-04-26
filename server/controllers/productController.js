import fs from "fs";
import productModel from "../models/productModel.js";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import { gateway } from './../config/payment.js';
import braintree from "braintree";
import orderModel from "../models/orderModel.js";

//add new product:::::::::
//takes name,description,price,category, quantity, shipping,photo from req.fields(form-data)
//uses formidable middleware for taking photo from form-data
export const addProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } = req.fields;
      const { photo } = req.files;
      
  
      switch (true) {
        case !name:
          return res
            .status(200)
            .send({ success: false, message: "Product name is required!" });
        case !description:
          return res
            .status(200)
            .send({
              success: false,
              message: "Product description is required!",
            });
        case !price:
          return res
            .status(200)
            .send({ success: false, message: "Product price is required!" });
        case !category:
          return res
            .status(200)
            .send({ success: false, message: "Product category is required!" });
        case !quantity:
          return res
            .status(200)
            .send({ success: false, message: "Product quantity is required!" });
        case !photo:
          return res
            .status(200)
            .send({ success: false, message: "Product photo is required!" });
        case photo.size > 1024000:
          console.log(photo.size);
          return res
            .status(200)
            .send({
              success: false,
              message: "Product photo should be less than 1MB!",
            });
      }
      const isExist = await productModel.findOne({ name: name });
      if (isExist)
        return res
          .status(412)
          .send({ success: false, message: "Product already exists!" });
      const product = new productModel({ ...req.fields, slug: slugify(name) });
      product.photo.data = fs.readFileSync(photo?.path);
      product.photo.contentType = photo.type;
      await product.save();
      res
        .status(201)
        .send({ success: true, message: "Product added successfully", product });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "something went wrong",
      });
    }
  };

//update existing product:::::::::
//takes name,description,price,category, quantity, shipping,photo from req.fields(form-data)
//uses formidable middleware for taking photo from form-data
export const updateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
  
      switch (true) {
        case !name:
          return res
            .status(200)
            .send({ success: false, message: "Product name is required!" });
        case !description:
          return res
            .status(200)
            .send({
              success: false,
              message: "Product description is required!",
            });
        case !price:
          return res
            .status(200)
            .send({ success: false, message: "Product price is required!" });
        case !category:
          return res
            .status(200)
            .send({ success: false, message: "Product category is required!" });
        case !quantity:
          return res
            .status(200)
            .send({ success: false, message: "Product quantity is required!" });
        // case !photo:
        //   return res
        //     .status(200)
        //     .send({ success: false, message: "Product photo is required!" });
        case photo&&photo.size > 1024000:
          console.log(photo.size);
          return res
            .status(200)
            .send({
              success: false,
              message: "Product photo should be less than 1MB!",
            });
      }
      if(!(await productModel.findById(req.params.id))){
        return res
          .status(404)
          .send({ success: false, message: "Product doesn't exist!" });
      }
      const isExist = await productModel.findOne({ name: name }).sort({createdAt:1});
      if (isExist&&isExist._id!=req.params.id)
        return res
          .status(412)
          .send({ success: false, message: "Product with this name already exists!" });
    
      const product = await productModel.findByIdAndUpdate(req.params.id,{...req.fields,slug:slugify(name)},{new:true});

      if(photo){
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
        await product.save();
      }
      res
        .status(200)
        .send({ success: true, message: "Product updated successfully", product });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "something went wrong",
      });
    }
  };
    
//delete single product::::::::::
//takes id from req.params
export const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).send({success:false,message:"Product not found"})
        }
        res.status(200).send({success:true,message:"Product deleted successfully!"});
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Something went wrong!" });
    }
};

//get all products::::::::::
export const getProductsController = async (req, res) => {
  try {
    //get the products exclude photo, limit 12 and sort by created time(show latest products)
    const products = await productModel
      .find()
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 })
      .populate('category');
    res.status(200).send({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong!" });
  }
};

//get single product::::::::::
//takes slug from req.params
export const getSingleProductController = async (req, res) => {
    try {
      const product = await productModel
        .findOne({ slug: req.params.slug })
        .select("-photo").populate('category');
      if (!product)
        res.status(404).send({ success: false, message: "Product not found" });
      res.status(200).send({ success: true, product });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "Something went wrong!" });
    }
  };

//get single product photo::::::::::
//takes id from req.params
export const getSingleProductPhotoController = async (req, res) => {
    try {
        const product = await productModel
        .findById(req.params.id)
        .select("photo");
        if (!product.photo.data)
            res.status(404).send({ success: false, message: "Product not found!" });
            res.set('Content-type',product.photo.contentType);
        res.status(200).send(product.photo.data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Something went wrong!" });
    }
};







///test
export const updateProductControllerTest = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = await productModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if(!products)
        console.error("product not found");
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
};
//filter products::::::::::
export const productFiltersController=async(req,res)=>{
  try {
    const {categories,price}=req.body;
    console.log(categories);
    let args={}
    if(categories.length>0)args.category=categories;
    if(price.length)args.price={$gte:price[0],$lte:price[1]};
    const products=await productModel.find(args);
    res.status(200).send({
      success:true,
      products
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Something went wrong filtering products"
    })
    
  }
}


//count total products
export const productCountController=async(req,res)=>{
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Something went wrong."
    });
  }
}

// product list base on page::::::::
//takes page from req.params
export const productListController = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//search products::::::::
//takes keyword from req.params
export const searchProductController = async(req,res)=>{
  try {
    const {keyword}=req.params;
    const result= await productModel.find({
      $or:[
        {name:{$regex:keyword,$options:'i'}},
        {description:{$regex:keyword,$options:'i'}}
      ]
    }).select('-photo');
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Something went wrong",
      error,
    });

  } 
}


//similar product search
//takes pid, cid from req.params
export const relatedProductController=async(req,res)=>{
  try {
    const {pid,cid}=req.params;
    const products= await productModel.find({
      category:cid,
      _id:{$ne:pid}//current product's pid not include
    }).select("-photo").limit(3).populate('category');
    res.status(200).send({success:true,products});
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
}

//get products by category
//takes slug from req.params
export const productByCategoryController=async(req,res)=>{
  try {
    const category=await categoryModel.findOne({slug:req.params.slug});
    const products =await productModel.find({category}).populate('category');

    res.status(200).send({
      success:true,
      category,
      products
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
}


//payment gateway
export const brainTreeTokenController=async(req,res)=>{
  try {
    gateway.clientToken.generate({},function(err,response){
      if(err){
        console.log(err)
        return res.status(500).send({success:false,error:err});
      }
      res.status(200).send({success:true,response});
    });
    
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
}

export const brainTreePaymentController=async(req,res)=>{
  try {
    const {cart,nonce}=req.body;
    let totalPrice=0;
    cart.forEach(itm => {
      totalPrice+=itm.price;
    });

    let newTransaction=gateway.transaction.sale({
      amount:totalPrice,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true
      }
    },
    (error,result)=>{
      console.log(result);
      if(result.success){
         const order=new orderModel({
          products:cart,
          payment:result,
          buyer:req.user._id,
         }).save();
         res.json({ok:true});
      }else {
        res.status(500).send({success:false,error,message:"Payment failed."})
        console.log(result)
      }
    }
    
    )
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
}

