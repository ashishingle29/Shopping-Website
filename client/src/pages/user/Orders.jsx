import React,{useState,useEffect} from 'react';
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/menus/UserMenu';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import moment from 'moment';

const Orders = () => {
  const [orders,setOrders]=useState([]);
  const [auth]=useAuth();

  const getOrders=async()=>{
    try {
        const {data}=await axios.get('/api/auth/orders');
        console.log(data);
        setOrders(data.orders);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      
    }
  }

  useEffect(()=>{
    if(auth?.token){
        getOrders();
    }
  },[]);
  return (
    <Layout title={"Orders > Z-SHOP"}>
        <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9 my-3">
                        <div className="card m-3 p-3 overflow-scroll">
                            <h3>Orders</h3>
                            <div className="border shadow overflow-scroll">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Buyer</th>
                                    <th scope='col'>Orders</th>
                                    <th scope='col'>Payment</th>
                                    <th scope='col'>Quantity</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orders.map((o,i)=>(
                                    <>
                                  <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{o?.status}</td>
                                    <td>{o?.buyer?.name}</td>
                                    <td>{moment(o?.createdAt).fromNow()}</td>
                                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                    <td>{o?.products?.length}</td>
                                  </tr>
                                  <tr>
                                    <td></td>  
                                  <td colSpan={5}>
                                    
                                    
                                  <div className="container ms-4" style={{width:"auto"}}>
                                  {o?.products?.map((p, j) => (
                                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                      <div className="col-md-3 d-flex  align-items-center">
                                        <img
                                          src={`${process.env.REACT_APP_BACKEND_API}/api/product/get-photo/${p._id}`}
                                          className="card-img-top"
                                          alt={p.name}
                                          style={{ width: "100px", height: "100px" }}
                                        />
                                      </div>
                                      <div className="col-md-8 d-flex flex-column justify-content-center">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price : {p.price}</p>
                                      </div>
                                    </div>
                                  ))}
                                    </div></td></tr>
                                    </>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </Layout>
  )
}

export default Orders
