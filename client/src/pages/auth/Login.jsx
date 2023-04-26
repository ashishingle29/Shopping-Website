import React, { useState } from 'react'
import Layout from '../../components/layout/Layout';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../utils/axiosInstance';
import { useAuth } from '../../context/auth';
import About from './../about/About';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth]=useAuth();
  
  const navigate=useNavigate();
  const location=useLocation();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.post("/api/auth/login",{email,password});
      console.log(res)
      if(res.data.success){
        toast.success(res.data.message);
        setAuth({...auth,user:res.data.user,token:res.data.token});
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate(location.state||"/");
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
  return (
    <Layout title="Login - Z-Shop">
      <div className="login container p-3 d-flex flex-column justify-content-center h-100" >
        <h1 className="text-center">Login Form</h1>
        <form className='col-md-6 m-auto' onSubmit={handleSubmit}>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Link to="/forgot-password" className='float-end'>Forgot Password?</Link>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <button type="submit" className="btn btn-primary w-75 m-auto d-block">
            Login
          </button>
          <p className='text-center'>Don't have an account? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </Layout>
  )
}

export default Login
