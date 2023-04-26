import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import axios from '../../utils/axiosInstance.js';
import {IoIosAddCircle} from 'react-icons/io'
import {MdDelete} from "react-icons/md"
import {FiEdit} from 'react-icons/fi'
import { modalHandler } from '../../utils/utils';

const CategoryList = () => {
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
  useEffect(() => {
    getCategories();
  }, [itemToDelete,showModal]);
  return (
    <>
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
  </ul></>
  )
}

export default CategoryList
