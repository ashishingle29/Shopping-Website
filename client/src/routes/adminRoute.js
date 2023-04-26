import { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/auth";
import axios from '../utils/axiosInstance';

export default function AdminRoute(){
  const [ok,setOk]=useState(false);
  const [auth,setAuth]=useAuth();

  useEffect(() => {
    const authCheck=async()=>{
      const res=await axios.get("api/auth/admin-auth");
      if(res.data.ok){
          setOk(true);
      }else
          setOk(false);
    }
    if(auth?.token)authCheck();
  }, [auth?.token])
  


  return ok?<Outlet/>:<Spinner/>;
}
