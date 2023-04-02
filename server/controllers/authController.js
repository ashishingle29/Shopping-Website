import { comparePassword, hashPassword, getRandomWords } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

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

export const testController = (req, res) => {
  console.log(req.headers);
  res.send("protected route");
};

export { registerController, loginController }; 
