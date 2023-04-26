import React,{ useEffect,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const Spinner = ({path="/login"}) => {
    const [count,setCount]=useState(1);
    const navigate=useNavigate();
    const location=useLocation();

    useEffect(()=>{
        const interval=setInterval(()=>{
            setCount((prev)=>--prev);
            
        },1000);
        count===0&&navigate(path,{state:location.pathname});
        return ()=>{
            clearInterval(interval);
        }
    },[count,navigate,location,path]);
  return (
    <>
      <div className="d-flex flex-column justify-content-center vh-100 align-items-center">
        <div className="spinner-grow" role="status">
          <span className="sr-only" />
        </div>
        <h1>Redirecting in {count}s</h1>
      </div>

    </>
  );
};

export default Spinner;
