import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../utils/axiosInstance';
import { useCart } from '../../context/cart';
import { toast } from 'react-toastify';
import { modalHandler } from './../../utils/utils';
import LoaderContainerModal from './../../components/modal/LoaderContainerModal';
import { HashLoader } from 'react-spinners';

const CategoryProducts = () => {
  const params=useParams();
  const navigate= useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart,setCart]=useCart();
  const [loading,setLoading]=useState(false);

  const getProducts=async()=>{
    setLoading(true)
    try {
      const {data}=await axios.get(`/api/product/category-product/${params.slug}`);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);

    }
    setLoading(false);
  }
  useEffect(()=>{
    modalHandler(loading);
  },[loading]);
  useEffect(() => {
    getProducts();
  }, [params.slug])
  
  return (
    <Layout title={"Products by category > ZSHOP"}>
    {loading&&(
      <LoaderContainerModal element={<HashLoader size={100}/>}/>)
    }
      <div className="container mt-3">
        <h2 className='text-center'>Category: {category?.name}</h2>
        <h5 className='text-center'>{products.length} results found.</h5>
        
        <div className="d-flex flex-wrap justify-content-center">
              {products?.map((item)=>(
                <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={item.name}
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND_API}/api/product/get-photo/${item._id}`}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div className="card-title">{item.name}</div>
                  <div className="card-text">{item.description.substring(0,30)}...</div>
                  <div className="card-text mb-3 fw-bold mt-2">
                    MRP. {item.price}
                  </div>
                  <div className="btns">
                    <button
                      className="btn btn-info m-1"
                      onClick={() => navigate(`/product/${item.slug}`)}
                    >
                      More details
                    </button>
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => {
                        setCart([...cart,item]);
                        localStorage.setItem('cart',JSON.stringify([...cart,item]))
                        toast.success("Item added to cart.");
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
      </div>
    </Layout>
  )
}

export default CategoryProducts
