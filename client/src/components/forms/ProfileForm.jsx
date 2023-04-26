import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const ProfileForm = (props) => {
  const [auth,setAuth]=useAuth();
  const [item, setItem] = useState('');
  const [rp,setRp]=useState('');
  const handleSubmit=async(e)=>{
    console.log(auth.user.email);
    e.preventDefault();
    let profile={...auth.user};
    if(props.extras.itemToEdit==='password'&&item!==rp){
      return toast.error("Passwords do not match.");
    }
    eval(`profile.${props.extras.itemToEdit} = "${item}"`);
    try {
      const res=await axios.put(`/api/auth/update-profile`,{profile});
      if(res.data.success){
        console.log(res.data.user);
        setAuth({...auth,user:res.data.user});
        let lsd=JSON.parse(localStorage.getItem('auth'));
        lsd.user=res.data.user;
        localStorage.setItem('auth',JSON.stringify(lsd));
        toast.success(res.data.message);
        props.closeModal();
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }






  useEffect(() => {
    if(props.extras.itemToEdit!=='password')
      setItem(eval(`auth.user.${props.extras.itemToEdit}`));
  }, []);

  return (
    <>  
    <h5 className='px-5'>Update {props.extras.itemToEdit} : </h5>
    <form className={`d-flex justify-content-center align-item-center ${props.extras.itemToEdit==='password'&&"flex-column w-50 m-auto"}`} onSubmit={handleSubmit}>
      <div className="m-1">
        <input
          type={props.extras.itemToEdit==='password'?"password":"text"}
          className="form-control"
          id={props.extras.itemToEdit}
          placeholder={`Enter ${props.extras.itemToEdit}`}
          onChange={(e)=>{setItem(e.target.value)}}
          value={item}
        />

      {props.extras.itemToEdit==='password'&&
        <input
        type="password"
        className="form-control mt-2"
        id='rpassword'
        placeholder={`Confirm password`}
        onChange={(e)=>{setRp(e.target.value)}}
        value={rp}
        />
      }
      </div>
        <button type="submit" className="btn btn-success m-1">
          Update
        </button>
    </form>
    </>
  )
}

export default ProfileForm
