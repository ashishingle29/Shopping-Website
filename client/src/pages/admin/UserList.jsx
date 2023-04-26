import React,{useState,useEffect} from 'react'
import Layout from './../../components/layout/Layout';
import AdminMenu from './../../components/menus/AdminMenu';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { useAuth } from '../../context/auth';
import Zmodal from './../../components/modal/Zmodal';
import DeletePrompt from './../../components/prompts/DeletePrompt';
import { modalHandler } from './../../utils/utils';
import { Badge,Card } from 'antd';
import {HiChevronDoubleDown,HiChevronDoubleUp} from 'react-icons/hi';
import AdminAction from './../../components/prompts/AdminAction';
const UserList = () => {
  const [users,setUsers]=useState([]);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showPromotePrompt, setShowPromotePrompt] = useState(false);
  const [itemToPromote, setItemToPromote] = useState(null);
  const [showDemotePrompt, setShowDemotePrompt] = useState(false);
  const [itemToDemote, setItemToDemote] = useState(null);
  const [maxRole,setMaxRole]=useState(0);
  const [auth]=useAuth();

  const getUsers=async()=>{
    try {
      const {data}=await axios.get("/api/auth/get-users");
      setUsers(data.users);
      setMaxRole(data.users.reduce((max, user) => user.role > max ? user.role : max, 0));


    } catch (error) {
      console.log(error);
      toast.error("Something went wrong getting user list.")
    }
  }

  const deleteHandler=async()=>{
    try {
      const res=await axios.delete(`/api/auth/delete-user/${itemToDelete._id}`);
      if(res.data.success){
        toast.success(res.data.message);
        setShowDeletePrompt(false);modalHandler(false);
        setItemToDelete(false);
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  }

  const promoteHandler=async()=>{
    console.log(itemToPromote);
    try {
      const res=await axios.put(`/api/auth/promote-user/${itemToPromote._id}`);
      if(res.data.success){
        toast.success(res.data.message);
        setShowPromotePrompt(false);
        modalHandler(false);
        setItemToPromote(false);
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  }
  const demoteHandler=async()=>{
    
    console.log(itemToDemote);
    try {
      const res=await axios.put(`/api/auth/demote-user/${itemToDemote._id}`);
      if(res.data.success){
        toast.success(res.data.message);
        setShowDemotePrompt(false);
        modalHandler(false);
        setItemToDemote(false);
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  }
  useEffect(()=>{
    getUsers();

  },[itemToDelete,itemToPromote,itemToDemote]);
  return (
    <Layout title={"User List > Z-SHOP"}>
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
    {showPromotePrompt && (
      <Zmodal
        element={AdminAction}
        closeModal={() => {
          setShowPromotePrompt(false);
          modalHandler(false);
          setItemToPromote(null);
        }}
        extras={{action: promoteHandler }}
      />
    )}
    {showDemotePrompt && (
      <Zmodal
        element={AdminAction}
        closeModal={() => {
          setShowDemotePrompt(false);
          modalHandler(false);
          setItemToDemote(null);
        }}
        extras={{ action:demoteHandler }}
      />
    )}
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="card m-3 p-3">
              <h3 className="w-auto m-0">User List</h3>

              <ul className="list-group">
                {users &&
                  users.map((item) => (
                    <li className="list-group-item" key={item.name}>
                      <Badge.Ribbon text={item.role>0?"a-"+item.role:"u"} placement='start' color={auth.user._id===item._id&&"green"}>
                        <span className="float-start text-primary btn ms-3">
                          {item.name}
                        </span>
                      </Badge.Ribbon>
                      {auth.user.role>item.role&&
                        <div className="action-btns float-end">
                          {item.role<maxRole&&
                          <span
                            className="text-primary btn"
                            onClick={() => {
                              setItemToPromote(item);
                              setShowPromotePrompt(true);
                              modalHandler(true);
                            }}
                          >
                            <HiChevronDoubleUp />
                          </span>
                          }
                          {item.role>0&&
                          <span
                            className="text-primary btn"
                            onClick={() => {
                              setItemToDemote(item);
                              setShowDemotePrompt(true);
                              modalHandler(true);
                            }}
                          >
                            <HiChevronDoubleDown />
                          </span>
                          }
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
                        </div>
                      }
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserList
