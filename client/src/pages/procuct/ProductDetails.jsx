import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/cart";
import axios from "../../utils/axiosInstance";
import Layout from './../../components/layout/Layout';
import { modalHandler } from './../../utils/utils';
import LoaderContainerModal from './../../components/modal/LoaderContainerModal';
import { HashLoader } from 'react-spinners';
const ProductDetails = () => {
  const params = useParams();
  const navigate=useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts,setRelatedProducts]=useState([]);
  const [cart,setCart]=useCart();
  const [loading,setLoading]=useState(false);
  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/product/get-product/${params.slug}`
      );
      setProduct(data.product);
      getRelatedProduct(data.product._id,data.product.category._id)
      // console.log(relatedProducts)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const getRelatedProduct=async(pid,cid)=>{
    try {
      const {data}=await axios.get(`api/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products)
      console.log(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  useEffect(()=>{
    modalHandler(loading);
  },[loading]);
  useEffect(() => {
    params?.slug && getProduct();
  }, [params.slug]);

  
  return (
    <Layout title="Product details > ZSHOP">
    {loading&&(
      <LoaderContainerModal element={<HashLoader size={100}/>}/>)
    }
      <div className="row container mt-3 mx-auto">
        <div className="col-md-6">
          <img
            src={product._id?`${process.env.REACT_APP_BACKEND_API}/api/product/get-photo/${product._id}`:""}
            className="img img-responsive"
            alt={product.name}
            height="300"
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h3>Name: {product.name}</h3>
          <h5>Description: {product.description}</h5>
          <h5>Price: {product.price}</h5>
          <h5>Category: {product?.category?.name}</h5>
          <h5>Shipping: {product.shipping ? "Yes" : "No"}</h5>

          <button className="btn btn-primary my-3"
                      onClick={() => {
                        setCart([...cart,product]);
                        localStorage.setItem('cart',JSON.stringify([...cart,product]))
                        toast.success("Item added to cart.");
                      }}>Add to cart</button>
        </div>
        <div className="row">
          <h1>Similar Products</h1>
          {relatedProducts?.length<1&&<p>No similar product found.</p>}
          <div className="d-flex flex-wrap justify-content-center">
              {relatedProducts?.map((item)=>(
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
      </div>
    </Layout>
  );
};

export default ProductDetails;

