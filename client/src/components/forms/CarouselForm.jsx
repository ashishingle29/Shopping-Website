import TextArea from 'antd/es/input/TextArea';
import React,{useState,useEffect} from 'react';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
const CarouselForm = (props) => {

  const [photo, setPhoto] = useState();
  const [caption, setCaption] = useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();try {
      const carData=new FormData();
      carData.append('caption',caption);
      if(!props.extras.itemToEdit)
        carData.append('photo',photo);
      else if(props.extras.itemToEdit&&photo){
        carData.append('photo',photo);
        console.log("photo required");
      }

      let res;
      if(!props.extras.itemToEdit){
        res = await axios.post("/api/carousel/add",carData);
      }else{
        res = await axios.put(`/api/carousel/update/${props.extras.itemToEdit._id}`,carData);
      }
      
      if(res.data.success){
        toast.success(res.data.message);
        props.closeModal();
      }
      else
        toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
  useEffect(()=>{
    setCaption(props.extras.itemToEdit?.caption);
  },[])
  return (
    <>
      <h5 className=''>Carousel : </h5>
    <form className={`d-flex flex-column justify-content-center align-item-center container`}
      onSubmit={handleSubmit}>


      
      <div className="my-3">
          <label htmlFor="photo" className="form-label">
            Upload Banner: 
          </label>
          <input
            className="form-control w-50 m-auto"
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
      </div>
      <div className="mb-3">
        {photo ?(
          <div className="text-center">
            <img
              src={URL.createObjectURL(photo)}
              alt="Carousel"
              className="img img-responsive"
              style={{height:"100px"}}
            />
          </div>
        ):props.extras.itemToEdit?(
          
          <div className="text-center">
            <img
              src={`${process.env.REACT_APP_BACKEND_API}/api/carousel/get-photo/${props.extras.itemToEdit._id}`}
              alt="Carousel"
              style={{height:"100px"}}
              className="img img-responsive"
            />
          </div>
        ):""}
      </div>
      <div className="m-1">
        <TextArea
          type="text"
          className="form-control"
          placeholder={`Caption`}
          onChange={(e)=>{setCaption(e.target.value)}}
          value={caption}
        />

      </div>
        <button type="submit" className="btn btn-success m-1">
          Submit
        </button>
    </form>
    </>
  )
}

export default CarouselForm
