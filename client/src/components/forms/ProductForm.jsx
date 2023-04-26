import React, { useEffect,useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import { Select } from "antd";
import { useNavigate } from 'react-router-dom';
import {AiOutlineUnorderedList} from 'react-icons/ai'
const { Option } = Select;
const ProductForm = (props) => {
  const navigate=useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(props.itemToEdit?.category._id||"");
  const [name, setName] = useState(props.itemToEdit?.name)
  const [description, setDescription] = useState(props.itemToEdit?.description);
  const [price, setPrice] = useState(props.itemToEdit?.price);
  const [quantity, setQuantity] = useState(props.itemToEdit?.quantity);
  const [shipping, setShipping] = useState(props.itemToEdit?.shipping);
  const [photo, setPhoto] = useState();
  const getCategories = async () => {
    try {
      const res = await axios.get("/api/category/get-categories");
      if (res.data.success) setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const productData=new FormData();
      productData.append('name',name);
      productData.append('description',description);
      productData.append('price',price);
      productData.append('quantity',quantity);
      productData.append('category',category);
      productData.append('shipping',shipping);
      if(props.page==='add')
        productData.append('photo',photo);
      else if(props.page==='update'&&photo){
        productData.append('photo',photo);
        console.log("photo required");
      }

      let res;
      if(props.page==='add'){
        res = await axios.post("/api/product/add-product",productData);
      }else if(props.page==='update'){
        res = await axios.put(`/api/product/update-product/${props.itemToEdit._id}`,productData);
      }
      
      if(res.data.success){
        toast.success(res.data.message)
        props.changePage("list");
      }
      else
        toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    if(props.itemToEdit){
      return;
    }
    
  }, [photo]);
  return (
    <>
      <div className="row justify-content-between">
        <h3 className="w-auto m-0">
          {props.page === "add" ? "Add" : "Update"} Product
        </h3>
        <button
          className="btn  w-auto"
          style={{ fontSize: "25px" }}
          onClick={() => {
            props.changePage("list");
          }}
        >
          <AiOutlineUnorderedList />
        </button>
      </div>
      <div className="m-1">
        <label htmlFor="category" className="form-label">
          Select category:
        </label>
        <Select
          bordered={false}
          placeholder="Select a category"
          size="large"
          showSearch
          className="form-select mb-3"
          onChange={(value) => {
            setCategory(value);
          }}
          value={category}
        >
          {categories?.map((c) => (
            <Option key={c.id} value={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            Upload Photo:{" "}
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
                alt="Product"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          ):props.page==='update'?(
            
            <div className="text-center">
              <img
                src={`${process.env.REACT_APP_BACKEND_API}/api/product/get-photo/${props.itemToEdit._id}`}
                alt="Product"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          ):""}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            value={name}
            placeholder="Product name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            type="text"
            value={description}
            placeholder="Product description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="text"
            value={price}
            placeholder="Product price"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity:
          </label>
          <input
            type="text"
            value={quantity}
            placeholder="Product quantity"
            className="form-control"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="shipping" className="form-label">
            Shipping:
          </label>
          <Select
            className="form-select"
            bordered={false}
            placeholder="Select shipping"
            onChange={(value) => setShipping(value)}
            value={shipping?"Yes":"No"}
            showSearch
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>
        </div>
        <div className="mb-3">
          <button
            className="btn btn-primary form-control"
            onClick={handleSubmit}
          >
            {props.page === "add" ? "Add" : "Update"} Product
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductForm
