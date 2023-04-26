import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/menus/AdminMenu';
import { IoIosAddCircle } from 'react-icons/io';
import Zmodal from '../../components/modal/Zmodal';
import { modalHandler } from '../../utils/utils';
import CarouselForm from '../../components/forms/CarouselForm';
import { toast } from 'react-toastify';
import axios from '../../utils/axiosInstance';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../../styles/carousel.css';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import DeletePrompt from './../../components/prompts/DeletePrompt';

const CarouselPage = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [itemToEdit,setItemToEdit]=useState(null);
  const [itemToDelete,setItemToDelete]=useState(null);
  const [carouselItems,setCarouselItems]=useState([]);

  const getCarouselItems=async()=>{
    try {
      const {data}=await axios.get('/api/carousel/get-items');
      setCarouselItems(data.items);

    } catch (error) {
      console.log(error);
      toast.error("Error fetching carousel items.");
    }
  }
  
  const deleteHandler=async()=>{
    try {
      const res=await axios.delete(`/api/carousel/delete/${itemToDelete._id}`);
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
  useEffect(()=>{
    getCarouselItems();
  },[itemToDelete,itemToEdit,showFormModal]);
  return (
    <Layout title={"Admin Dashboard > Z-SHOP"}>
      {showFormModal && (
        <Zmodal
          element={CarouselForm}
          closeModal={() => {
            setShowFormModal(false);
            modalHandler(false);
            setItemToEdit(null);
          }}
          extras={{ itemToEdit }}
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
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card m-3 p-3">
              <div className="row justify-content-between">
                <h3 className="w-auto m-0">Carousel</h3>
                <button
                  className="btn  w-auto"
                  style={{ fontSize: "25px" }}
                  onClick={() => {
                    setShowFormModal(true);
                    modalHandler(true);
                  }}
                >
                  <IoIosAddCircle />
                </button>
              </div>
              <div className="row">
                <Carousel
                  className="carousel-admin"
                  showThumbs={true}
                  showStatus={false}
                  infiniteLoop={true}
                >
                  {carouselItems.map((item, index) => (
                      <div key={index}>
                        <img
                          src={`${process.env.REACT_APP_BACKEND_API}/api/carousel/get-photo/${item._id}`}
                          alt="carousel item"
                        />
                        <p className="legend">{item.caption}</p>
                        
                        <div className="row action-btns">
                        <span
                        className="text-danger btn"
                        onClick={() => {
                          setItemToDelete(item);
                          setShowDeletePrompt(true);
                          modalHandler(true);
                        }}
                      >
                        <MdDelete />
                      </span>
                      <span
                        className="text-primary btn"
                        onClick={() => {
                          setItemToEdit(item);
                          setShowFormModal(true);
                          modalHandler(true);
                        }}
                      >
                        <FiEdit />
                      </span>
                        </div>
                      </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CarouselPage;
