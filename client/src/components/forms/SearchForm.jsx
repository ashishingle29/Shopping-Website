import React, {useEffect, useState} from "react";
import { useSearch } from "../../context/search";
import { toast } from 'react-toastify';
import axios from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../../styles/searchform.css';
import {FaSearch} from 'react-icons/fa'
import LoaderContainerModal from './../modal/LoaderContainerModal';
import { HashLoader } from 'react-spinners';
import { modalHandler } from './../../utils/utils';
const SearchForm = () => {
  const [values, setValues] = useSearch();
  const [loading,setLoading]=useState();
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!values.keyword)return;
    setLoading(true);
    try {
      const {data}=await axios.get(`/api/product/search/${values.keyword}`);
      setValues({...values,results:data});
      navigate('/search');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  }
  useEffect(()=>{
    modalHandler(loading);
  },[loading]);
  return (
    <>
    {loading&&(
      <LoaderContainerModal element={<HashLoader size={100}/>}/>)
    }
      <form action="" className="d-flex me-5 search-form">
          <input
            type="search"
            className="form-control me-2"
            placeholder="Search..."
            aria-label="Search"
            value={values.keyword}
            onChange={e=>setValues({...values,keyword:e.target.value})}
          />
          <button className="btn btn-outline-success" type="submit" onClick={handleSubmit}>
            <FaSearch/>
          </button>
      </form>
    </>
  );
};

export default SearchForm;
