import React from 'react'
import Layout from '../../components/layout/Layout';
import { useState,useEffect } from 'react';
import { generateRandomIndexes, nthSuffix } from '../../utils/utils';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [secretWords,setSecretWords]=useState(['','','']);
  const [secretWordIndexes,setSecretWordIndexes]=useState([]);
  const [verified,setVerified]=useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newRpassword, setNewRpassword] = useState('');

  const navigate=useNavigate();

  useEffect(() => {
    setSecretWordIndexes(generateRandomIndexes(10,3));
  }, []);


  const handleSecretWordChange=(value,index)=>{
    const newWords=secretWords;
    newWords[index]=value;
    setSecretWords(newWords);
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(verified){
      if(newPassword!==newRpassword){
        return toast.error("Passwords do not match.")
      }
      try {
        //request for changing the password
        const res=await axios.put("/api/auth/forgot-password/",{email,secretWords,secretWordIndexes,newPassword});
        toast.success(res.data.message);
        navigate("/login");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
    // console.log(secretWords);
    // console.log(generateRandomIndexes(10,3));
    else
      try{
        const res=await axios.post("/api/auth/forgot-password/",{email,secretWords,secretWordIndexes});
        console.log(res.response);
        setVerified(true);
      }catch(err){
        toast.error(err.response.data.message);
      }
  }

  const preVerify=
<>
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
    required
  />
</div>
<div className="mb-3 m-auto d-block text-center">
  <label htmlFor="" className="form-label d-block text-left">
    Enter the secret words:
  </label>
  <div className="d-flex">
    {secretWordIndexes.map((val,index)=>(
    <input
      type="text"
      key={index}
      className="flex-grow-1 form-control m-1"
      placeholder={`${val+1}${nthSuffix(val+1)} word`}
      onChange={(e) => { handleSecretWordChange(e.target.value, index) }}
      required
    />)
    )}
    {/* <input
      type="text"
      className="flex-grow-1 form-control m-1"
      placeholder="nth word"
      onChange={(e) => { handleSecretWordChange(e.target.value, 1) }}
    />
    <input
      type="text"
      className="flex-grow-1 form-control m-1"
      placeholder="nth word"
      onChange={(e) => { handleSecretWordChange(e.target.value, 2) }}
    /> */}
  </div>
</div>
</>

  const postVerify=
<>
<div className="mb-3">
  <label htmlFor="password" className="form-label">
    New Password
  </label>
  <input
    type="password"
    className="form-control"
    id="password"
    placeholder="Enter new password"
    onChange={(e)=>{setNewPassword(e.target.value)}}
    required
  />
</div>
<div className="mb-3">
  <label htmlFor="new-password" className="form-label">
    Re-type New Password
  </label>
  <input
    type="password"
    className="form-control"
    id="new-password"
    placeholder="Enter new password"
    onChange={(e)=>{setNewRpassword(e.target.value)}}
    required
  />
</div>
</>
  return (
    <Layout>
        <div className="container forgotPassword">
        <h1 className="text-center">Password Reset Form</h1>
        <form className='col-md-6 m-auto' onSubmit={handleSubmit}>
          {!verified&&preVerify}
          {verified&&postVerify}
          <button type="submit" className="btn btn-primary w-75 m-auto d-block">
            {verified?"Change Password":"Verify"}
          </button>
        </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword
