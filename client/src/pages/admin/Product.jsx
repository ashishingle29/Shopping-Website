import React, { useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/menus/AdminMenu";
import ProductForm from './../../components/forms/ProductForm';
import { modalHandler } from './../../utils/utils';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import DeletePrompt from './../../components/prompts/DeletePrompt';
import Zmodal from './../../components/modal/Zmodal';
import { IoIosAddCircle } from 'react-icons/io';


const Product = (props) => {
  
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [page, setPage] = useState("list");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [products, setProducts] = useState([]);  
  const getProducts=async()=>{
    try {
      const res=await axios.get("/api/product/get-products");
      if(res.data.success)
        setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  const deleteHandler=async()=>{
    console.log(itemToDelete);
    try {
      const res=await axios.delete(`/api/product/delete-product/${itemToDelete._id}`);
      if(res.data.success){
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
    setShowDeletePrompt(false);modalHandler(false)
  }





  useEffect(() => {
    if(!showDeletePrompt){
      setItemToDelete(null);
    }
  }, [showDeletePrompt]);
  useEffect (() => {
    getProducts();
  }, [itemToDelete,page]);
  const productList=   <> 
  <div className="row justify-content-between">
    <h3 className="w-auto m-0">Products</h3>
    <button
      className="btn  w-auto"
      style={{ fontSize: "25px" }}
      onClick={() => {
        setPage("add");
      }}
    >
      <IoIosAddCircle />
    </button>
  </div>
  <div className="d-flex flex-wrap justify-content-center">
    {products &&
      products.map((item) => (
          <div className="card m-2" style={{width: '18rem'}} key={item.name}>
            <img src={`${process.env.REACT_APP_BACKEND_API}/api/product/get-photo/${item._id}`} className="card-img-top" alt={item.name} />
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description.substring(0,30)}...</p>
              
              <div className="action-btns">
                <span
                  className="float-end text-danger btn"
                  onClick={() => {
                    setItemToDelete(item);
                    setShowDeletePrompt(true);
                    modalHandler(true);
                  }}
                >
                  <MdDelete />
                </span>
                <span
                  className="float-end text-primary btn"
                  onClick={() => {
                    setItemToEdit(item);
                    console.log(item);
                    setPage("update");
                  }}
                >
                  <FiEdit />
                </span>
              </div>
            </div>
          </div>

      ))}
  </div>
      </>
  return (
    <Layout title={"Product > Z-SHOP"}>
    {showDeletePrompt && (
      <Zmodal
        element={DeletePrompt}
        closeModal={() => {
          setShowDeletePrompt(false);
          modalHandler(false);
          setItemToDelete(null);
        }}
        extras={{ deleteHandler }}
      />
    )}
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3 mt-3">
              {
              (page==='list')?(
                productList):
              (page==='add')?(
                <ProductForm changePage={setPage} page={page}/>
              ):
              (page==='update')?(
                
                <ProductForm changePage={setPage} page={page} itemToEdit={itemToEdit}/>
              ):""
              }
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
