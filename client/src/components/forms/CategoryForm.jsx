import React, { useEffect, useState } from 'react';

import axios from "../../utils/axiosInstance";
import { toast } from 'react-toastify';
const CategoryForm = (props) => {
  const [name, setName] = useState("");
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(name)
    if(!props.extras.itemToEdit)
      try {
        const res=await axios.post(`/api/category/create-category/`,{name});
        res.data.success?toast.success(res.data.message):toast.error(res.data.message);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
    else
      try {
        const res=await axios.put(`/api/category/update-category`,{id:props.extras.itemToEdit._id,name});
        res.data.success?toast.success(res.data.message):toast.error(res.data.message);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
    props.closeModal();
  }
  
  useEffect(()=>{
    setName(props.extras.itemToEdit?.name);
  },[])
  return (
    <>  
      <h5 className='px-5'>{props.extras.itemToEdit?"Edit":"Add"} category: </h5>
      <form className='d-flex justify-content-center' onSubmit={handleSubmit}>
        <div className="m-1">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter category name"
            onChange={(e)=>{setName(e.target.value)}}
            value={name}
          />
        </div>
        <button type="submit" className="btn btn-success m-1" >
          {props.extras.itemToEdit?"Update":"Add"}
        </button>
      </form>
    </>
  )
}

export default CategoryForm
