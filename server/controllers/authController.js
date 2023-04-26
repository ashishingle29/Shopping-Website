import { comparePassword, hashPassword, getRandomWords } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

//registration::::::::
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const secretWords=await getRandomWords(10);
    console.log(secretWords)
    //validation::::::
    if (!name) return res.send({ message: "Name is required!" });
    if (!email) return res.send({ message: "Email is required!" });
    if (!password) return res.send({ message: "Password is required!" });
    if (!phone) return res.send({ message: "Phone number is required!" });
    if (!address) return res.send({ message: "Address is required!" });
    if (!secretWords) return res.send({ message: "Something went wrong!" });

    //check if user already exists:::::
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered with this email. Please login.",
      });
    }

    //register user:::::::
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      secretWords
    }).save();
    res.status(201).send({
      success: true,
      message: "User registration successful",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error on registration",
      error,
    });
  }
};

//login::::::::::
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not found!",
      });
    }
    const cmp = await comparePassword(password, user.password);
    if (!cmp) {
      return res.status(200).send({
        success: false,
        message: "Wrong password",
      });
    }
    //jwt generation:::::
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id:user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error on login",
      error,
    });
  }
};

//forgot password:::::::::
export const verifyForgotPassword=async(req,res)=>{
  try {
    const {email,secretWords,secretWordIndexes}=req.body;
    if(!email){
      res.status(400).send({success:false,message:"Email is required"});
    }
    if(!secretWords){
      res.status(400).send({success:false,message:"Secret words are required"});
    }
    //checking email against password:::::::::::
    const user=await userModel.findOne({email});
    if(!user)
      return res.status(404).send({success:false,message:"Email not found!"});
    
    for(let i=0;i<secretWordIndexes.length;i++){
      console.log(secretWords[i],user.secretWords[secretWordIndexes[i]])
      if(secretWords[i]!=user.secretWords[secretWordIndexes[i]]){
        return res.status(403).send({success:false,message:"Your answer is wrong."});
      }
    }
      res.status(200).send({success:true,message:"verified."});

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Something went wrong',
      error
    })
  }
}

//reset password:::::::::::::
export const resetForgotPassword=async(req,res)=>{
  try {
    const {email,secretWords,secretWordIndexes,newPassword}=req.body;
    if(!email){
      return res.status(400).send({success:false,message:"Email is required"});
    }
    if(!secretWords){
      return res.status(400).send({success:false,message:"Secret words are required"});
    }
    //checking email against password:::::::::::
    const user=await userModel.findOne({email});
    if(!user)
      return res.status(404).send({success:false,message:"Email not found!"});
    
    for(let i=0;i<secretWordIndexes.length;i++){
      console.log(secretWords[i],user.secretWords[secretWordIndexes[i]])
      if(secretWords[i]!=user.secretWords[secretWordIndexes[i]]){
        return res.status(403).send({success:false,message:"You are not verified to reset password"});
      }
    }
    const hashedpassword=await hashPassword(newPassword);
    console.log(hashedpassword)
    const updateUser=await userModel.findOneAndUpdate({email},{
      $set:{password:hashedpassword}
    });
    res.status(200).send({success:true,message:"Password updated successfully."});

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Something went wrong',
      error
    })
  }
}

export const updateProfileController=async(req,res)=>{
  try {
    const {_id,name, email, phone, address}=req.body.profile;
    const userData={name,email,phone,address};
    const emailExists=await userModel.findOne({email});
    if(emailExists&&emailExists._id!=_id){
      return res.status(200).send({success:false,message:"An account with this email already exists."})
    }
    console.log(req.body.profile)
    if(req.body.profile.password){
      const hashedpass= await hashPassword(req.body.profile.password);
      userData.password=hashedpass;
    }

    const user=await userModel.findByIdAndUpdate(_id,{
      $set:userData
    },{new:true});


    res.status(200).send({success:true,message:"Profile updated successfully.",user: {
      _id:user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role:user.role
    }});
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Something went wrong',
      error
    });
  }
}

//get all users::::::::::
export const getUsersController=async(req,res)=>{
  try {
    let users=await userModel.find().sort({role:'-1'});
    users = users.map(user => {
      const { password, ...rest } = user.toObject(); // remove password field
      return rest;
    });
    res.status(200).json({success:true,users});
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Something went wrong',
      error
    });
  }
  
}
//delete user::::::::::
export const deleteUserController= async (req,res)=>{
  try {
      const admin=await userModel.findById(req.user._id).select('role');
      console.log(admin)
      const user=await userModel.findById(req.params.id);
      if(!user){
          return res.status(404).send({
              success:true,
              message:"user not found!"
          })
      }
      if(admin.role<=user.role)
        return res.status(403).send({success:false,message:'You cannot delete this user'});
      
      await user.deleteOne();
      res.status(200).send({
          success:true,
          message:"User deleted successfully"
      })
  } catch (error) {
      console.log(error);
      res.status(500).send({success:false, message:"something went wrong"});
  }
}

//promote user:::::::::::
export const promoteUserController=async(req,res)=>{
  try {
      const admin=await userModel.findById(req.user._id).select('role');
      console.log(admin)
      const user=await userModel.findById(req.params.id);
      if(!user){
          return res.status(404).send({
              success:true,
              message:"user not found!"
          })
      }
      if(admin.role<=user.role)
        return res.status(403).send({success:false,message:'You cannot promote this user'});
      user.role+=1;
      user.save();
      res.status(200).send({
          success:true,
          message:"User promoted successfully."
      })
  } catch (error) {
      console.log(error);
      res.status(500).send({success:false, message:"something went wrong"});
  }

}

//demote user:::::::::::
export const demoteUserController=async(req,res)=>{
  try {
      const admin=await userModel.findById(req.user._id).select('role');
      console.log(admin)
      const user=await userModel.findById(req.params.id);
      if(!user){
          return res.status(404).send({
              success:true,
              message:"user not found!"
          })
      }
      if(admin.role<=user.role||user.role<=0)
        return res.status(403).send({success:false,message:'You cannot promote this user'});
      user.role-=1;
      user.save();
      res.status(200).send({
          success:true,
          message:"User demoted successfully."
      })
  } catch (error) {
      console.log(error);
      res.status(500).send({success:false, message:"something went wrong"});
  }

}

//get all orders:::::::::
export const getOrdersController=async(req,res)=>{
  try {
    const orders=await orderModel.find({buyer:req.user._id}).populate('products','-photo').populate('buyer','name');
    res.status(200).json({success:true,orders});
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Something went wrong',
      error
    });
  }
}

export const manageOrdersController=async(req,res)=>{
  try {
    const orders=await orderModel.find().populate('products','-photo').populate('buyer','name').sort({createdAt:'1'});
    res.status(200).json({success:true,orders});
    
  } catch (error) {    
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Something went wrong',
      error
    });
  }
}


export const orderStatusController=async(req,res)=>{
  try {
    const {oid,status}=req.body;
    console.log(oid,status);
    const orders=await orderModel.findByIdAndUpdate(oid,{status},{new:true});
    res.status(200).send({success:true,orders});
  } catch (error) {    
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Something went wrong changing the status',
      error
    });
  }
}



export const testController = (req, res) => {
  console.log(req.headers);
  res.send("protected route");
};





export { registerController, loginController }; 
