import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/menus/AdminMenu';
import { toast } from 'react-toastify';
import axios from '../../utils/axiosInstance.js';
import {IoIosAddCircle} from 'react-icons/io'
import {MdDelete} from "react-icons/md"
import {FiEdit} from 'react-icons/fi'
import Zmodal from '../../components/modal/Zmodal';
import CategoryForm from '../../components/forms/CategoryForm';
import { modalHandler } from '../../utils/utils';
import DeletePrompt from '../../components/prompts/DeletePrompt';


const Category = () => {
  const [categories,setCategories]=useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  // const [showEditPrompt, setShowEditPrompt] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const getCategories=async()=>{
    try {
      const res=await axios.get("/api/category/get-categories");
      if(res.data.success)
        setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  const deleteHandler=async()=>{
    console.log(itemToDelete);
    try {
      const res=await axios.delete(`/api/category/delete-category/${itemToDelete._id}`);
      if(res.data.success){
        toast.success(res.data.message);
        setShowDeletePrompt(false);modalHandler(false);
        setItemToDelete(false)
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  }
  useEffect(() => {
    getCategories();
  }, [itemToDelete,showModal]);
  return (
    <Layout title={"Create Category > Z-SHOP"}>
      {showModal && (
        <Zmodal
          element={CategoryForm}
          closeModal={() => {
            setShowModal(false);
            modalHandler(false);
            setItemToEdit(null);
          }}
          extras={{itemToEdit}}
        />
      )}
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
      <div className="container-fluid p-3 ">
        <div className="row">
          <div className="col-md-3">
            <div className="">
              <AdminMenu />
            </div>
          </div>
          <div className="col-md-9 my-3">
            <div className="card p-3">
              <div className="row justify-content-between">
                <h3 className="w-auto m-0">Categories</h3>
                <button
                  className="btn  w-auto"
                  style={{ fontSize: "25px" }}
                  onClick={() => {
                    setShowModal(true);
                    modalHandler(true);
                  }}
                >
                  <IoIosAddCircle />
                </button>
              </div>
              <ul className="list-group">
                {categories &&
                  categories.map((item) => (
                    <li className="list-group-item" key={item.name}>
                      <span className="float-start text-primary btn">
                        {item.name}
                      </span>
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
                          setShowModal(true);
                          modalHandler(true);
                        }}
                      >
                        <FiEdit />
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Category;
