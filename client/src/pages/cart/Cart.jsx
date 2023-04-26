import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import Layout from './../../components/layout/Layout';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DropIn from 'braintree-web-drop-in-react';
import axios from '../../utils/axiosInstance';
import { formatStrategyValues } from 'rc-tree-select/lib/utils/strategyUtil';
const Cart = () => {
  const [cart,setCart]=useCart();
  const [auth,setAuth]=useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();

  const getTotalPrice=()=>{
    let total=0;
    cart.forEach(itm => {
      total+=itm.price;
    });
    return total;
  }

  const removeItem=(id)=>{
    try {
      let myCart=[...cart];
      const indexToRemove=myCart.findIndex(itm=>itm._id===id);
      myCart.splice(indexToRemove,1);
      setCart(myCart);
      localStorage.setItem('cart',JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");    }
  }

  const getToken=async()=>{
    try {
      const {data}=await axios.get('/api/product/braintree/token');
      setClientToken(data?.response.clientToken);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePayment=async()=>{
    try {
      setLoading(true);
      const {nonce}=await instance.requestPaymentMethod();
      const {data}=await axios.post('/api/product/braintree/payment',{nonce,cart});
      if(data.ok){
        localStorage.removeItem('cart');
        setCart([]);
        navigate('/dashboard/user/orders');
        toast.success('Payment successful.');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  useEffect(() => {
    getToken();
  }, [auth?.token]);
  return (
    <Layout title={"Cart > ZSHOP"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart. ${
                    auth?.token ? "" : "Please login to checkout."
                  }`
                : "Your cart is empty."}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 p-5">
            {cart?.map((itm,i) => (
              <div key={i} className="row flex-row mb-2 card">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_API}/api/product/get-photo/${itm._id}`}
                    className="card-img-top img img-responsive"
                    alt={itm.name}
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-center">
                  <h5>{itm.name}</h5>
                  <p>{itm.description.substring(0, 30)}...</p>
                  <p>Price: {itm.price}</p>
                  <div className="d-flex flex-row">
                    <button
                      className="btn btn-info m-1"
                      onClick={() => navigate(`/product/${itm.slug}`)}
                    >
                      More details
                    </button>
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => removeItem(itm._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3">
            <h3>Cart Summary</h3>
            <hr />
            <p>Total: {getTotalPrice()}</p>
            {cart.length>0&& (auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <b>Shipping Address: </b>
                  {auth.user.address}
                  <button
                    className="btn btn-outline-warning my-2"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address to checkout
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Login to checkout
                  </button>
                )}
              </div>
            ))}
            {clientToken && auth?.token && cart.length > 0 && (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className="btn btn-outline-primary mb-4 mx-auto d-block"
                  onClick={handlePayment}
                  disabled={
                    !clientToken || loading || !instance || !auth?.user.address
                  }
                >
                  {loading?"Processing...":"Checkout"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart
