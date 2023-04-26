import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout';
import { Link } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import {HashLoader} from 'react-spinners';
import LoaderContainerModal from './../../components/modal/LoaderContainerModal';
import { modalHandler } from './../../utils/utils';
const Categories = () => {
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(false);
  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/category/get-categories");
      if (res.data.success) setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(()=>{
    modalHandler(loading);
  },[loading]);
  useEffect(()=>{
    getCategories();
  },[]);
  return (
    <Layout title={"Categories > ZSHOP"}>
      {loading&&(
        <LoaderContainerModal element={<HashLoader size={100}/>}/>)
      }
      <div className="container">
        <div className="row">
          {categories.map((itm) => (
            <div className="col-md-6 text-center p-5" key={itm._id}>
            <Link
              to={`/category/${itm.slug}`}
              className="text-decoration-none bg-dark p-5 text-light rounded d-block"
            >
              {itm.name}
            </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Categories
