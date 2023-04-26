import {useState,useEffect} from 'react';
import axios from '../utils/axiosInstance';

export default function useCategory(){
  const [categories,setCategories]=useState([]);
  const getCategories = async () => {
    try {
      const res = await axios.get("/api/category/get-categories");
      if (res.data.success) setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getCategories();
  },[]);
  return categories;
}
