/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout';
import axios from '../../utils/axiosInstance'
import { toast } from 'react-toastify';
import { Checkbox,Radio } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { prices } from './../../components/filters/prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import ScaleLoader from 'react-spinners/ScaleLoader';
import '../../styles/homepage.css';
import { modalHandler } from './../../utils/utils';
import LoaderContainerModal from './../../components/modal/LoaderContainerModal';
import { HashLoader } from 'react-spinners';

const Homepage = () => {
  const [cart,setCart]=useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceRadio, setPriceRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading,setLoading]=useState(false);
  const [carouselItems,setCarouselItems]=useState([]);

  const navigate=useNavigate();

  const getCarouselItems=async()=>{
    setLoading(true);
    try {
      const {data}=await axios.get('/api/carousel/get-items');
      setCarouselItems(data.items);

    } catch (error) {
      console.log(error);
      toast.error("Error fetching carousel items.");
    }
    setLoading(false);
  }
  


  
  const getCategories = async () => {
    try {
      const res = await axios.get("/api/category/get-categories");
      if (res.data.success) setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
  const getProducts=async()=>{
    setLoading(true);
    
    try {
      const res=await axios.get(`/api/product/product-list/${page}`);
      if(res.data.success)
        setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
    setLoading(false) ;
  }

  const filterProduct=async()=>{
    setLoading(true);
    try {
      const {data}=await axios.post('/api/product/product-filters',{categories:checked,price:priceRadio});
      setProducts(data?.products)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
    setLoading(false);
  }

  const handleFilter=(val,id)=>{
    let filters=[...checked];
    if(val) filters.push(id);
    else  filters = filters.filter(item=>item!==id);

    setChecked(filters);
  }


  const getTotal=async()=>{
    try {
      const {data}=await axios.get("/api/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      
    }
  }
  const loadMore=async()=>{
    setLoading(true); 
    try {
      const res=await axios.get(`/api/product/product-list/${page}`);
      if(res.data.success)
        setProducts([...products,...res.data.products]);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  }
  
  useEffect(()=>{
    modalHandler(loading);
  },[loading]);
  useEffect(()=>{
    getCategories();
    getTotal();
    getCarouselItems();
  },[])
  useEffect(() => {
    if(!checked.length&&!priceRadio?.length)
      getProducts();
  }, [checked.length,priceRadio?.length]);
  useEffect(()=>{
    if(checked.length||priceRadio?.length)
      filterProduct();
  },[checked,priceRadio]);
  useEffect(()=>{
    if(page===1)return;
    loadMore();
  },[page])
  return (
    <Layout title={"Products - Best offers"}>
        <div className='carousel-container'>
          
          {loading&&(
            <LoaderContainerModal element={<HashLoader size={100}/>}/>)
          }
          {carouselItems&&
                <Carousel
                  key={carouselItems.length}
                  className="carousel-home"
                  infiniteLoop={true}
                  autoPlay={true}
                  interval={4000}
                  showStatus={false}
                >
                  {carouselItems.map((item, index) => (
                      <div key={index}>
                        <img
                          src={`${process.env.REACT_APP_BACKEND_API}/api/carousel/get-photo/${item._id}`}
                          alt="carousel item"
                        />
                        <p className="legend">{item.caption}</p>
                        
                      </div>
                  ))}
                </Carousel>
          }
          </div>
        <div className='container-fluid row'>
        <div className="col-md-2 filters">
          {/* filter by category */}
          <h5 className="text-center mt-5 fw-bold">Filter by catregory</h5>
          <div className="d-flex flex-column">
            {categories?.map((item) => (
              <Checkbox
                key={item._id}
                onChange={(e) => handleFilter(e.target.checked, item._id)}
              >
                {item.name}
              </Checkbox>
            ))}
          </div>

          {/* filter by price */}
          <h5 className="text-center mt-4 fw-bold">Filter by price</h5>
          <div className="d-flex flex-column">
            <Radio.Group
              onChange={(e) => setPriceRadio(e.target.value)}
              value={priceRadio}
            >
              {prices?.map((item) => (
                <div key={item._id}>
                  <Radio value={item.array}>{item.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-4">
            <button
              className="btn btn-warning"
              onClick={() => {
                window.location.reload();
              }}
              disabled={!(checked.length||priceRadio.length)}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-10">
          <h1 className='text-center'>All Products</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((item) => (
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
          <div className="my-2 p-3 text-center">
            {loading ? <ScaleLoader/> : (
              <>
            {products && products.length < total && (
              <button
                className="btn btn-outline-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >Load More
              </button>

            )}
            </>)
            } 
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Homepage
