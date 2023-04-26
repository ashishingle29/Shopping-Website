import React, { useState } from 'react'
import Layout from '../../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from "../../utils/axiosInstance";
import RegisterSecretWordModal from '../../components/modal/RegisterSecretWordModal';
import { useEffect } from 'react';
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [secretWords,setSecretWords]=useState(null);
  const navigate=useNavigate();

  const handleSubmitx=async(e)=>{
    e.preventDefault();
    setSecretWords(["a",'v','c',"a",'v','c',"a",'v','yfftyftyddrcyfftyftyddrcyfftyftyddrc','ctggggggggg']);
    setShowModal(true);
    toast.success("Reg success");
  }
  const handleCloseModal=()=>{
    setShowModal(false);
    document.body.style.overflow="visible";
    navigate("/login");
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(name,email,phone,password,address);
    // if(password.length<8){
    //   return toast.error("Password length must be 8 or more");
    // }

    try{
      const res=await axios.post(`/api/auth/register`,{name,email,password,address,phone});

      if(res.data.success){
        toast.success(res.data.message);
        setSecretWords(res.data.user.secretWords);
        setShowModal(true);
        // navigate("/login");
      }else{
        toast.error(res.data.message);
      }
    }catch(error){
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    if(showModal){
      document.body.style.overflow="hidden";
    }else{
      document.body.style.overflow="visible";

    }
  }, [showModal]);

  return (
    
    <Layout title="Register - Z-Shop">
      {showModal&&<RegisterSecretWordModal secretWords={secretWords} closeModal={handleCloseModal}/>}
      <div className="register container d-flex flex-column justify-content-center p-3">
        <h1 className="text-center">Registration Form</h1>
        <form className='col-md-6 m-auto' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter your phone number"
              onChange={(e)=>{setPhone(e.target.value)}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter your address"
              onChange={(e)=>{setAddress(e.target.value)}}
            />
          </div>
          <button type="submit" className="btn btn-primary w-75 m-auto d-block">
            Register
          </button>
          <p className='text-center'>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </Layout>
  );
}

export default Register
