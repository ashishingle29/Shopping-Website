import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/menus/UserMenu";
import { useAuth } from "../../context/auth";
import { FiEdit } from "react-icons/fi";
import { modalHandler } from "./../../utils/utils";
import ProfileForm from './../../components/forms/ProfileForm';
import Zmodal from './../../components/modal/Zmodal';
import AdminMenu from './../../components/menus/AdminMenu';

const AdminProfile = () => {
  const [auth, setAuth] = useAuth();
  const [itemToEdit, setItemToEdit] = useState("");
  const [showModal, setShowModal] = useState(false);
  return (
    <Layout title={"Profile > Z-SHOP"}>
      {showModal && (
        <Zmodal
          element={ProfileForm}
          closeModal={() => {
            setShowModal(false);
            modalHandler(false);
            setItemToEdit(null);
          }}
          extras={{ itemToEdit }}
        />
      )}
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card m-3 p-3">
              <h3>Profile</h3>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="float-start">
                    <b>Name:</b> {auth?.user.name}
                  </span>
                  <span
                    className="float-end text-primary btn"
                    onClick={() => {
                      setItemToEdit("name");
                      setShowModal(true);
                      modalHandler(true);
                    }}
                  >
                    <FiEdit />
                  </span>
                </li>

                <li className="list-group-item">
                  <span className="float-start">
                    <b>Email:</b> {auth?.user.email}
                  </span>
                  <span
                    className="float-end text-primary btn"
                    onClick={() => {
                        setItemToEdit("email");
                        setShowModal(true);
                        modalHandler(true);
                    }}
                  >
                    <FiEdit />
                  </span>
                </li>

                <li className="list-group-item">
                  <span className="float-start">
                    <b>Phone:</b> {auth?.user.phone}
                  </span>
                  <span
                    className="float-end text-primary btn"
                    onClick={() => {
                        setItemToEdit("phone");
                        setShowModal(true);
                        modalHandler(true);
                    }}
                  >
                    <FiEdit />
                  </span>
                </li>

                <li className="list-group-item">
                  <span className="float-start">
                    <b>Address:</b> {auth?.user.address}
                  </span>
                  <span
                    className="float-end text-primary btn"
                    onClick={() => {
                        setItemToEdit("address");
                        setShowModal(true);
                        modalHandler(true);
                    }}
                  >
                    <FiEdit />
                  </span>
                </li>
              </ul>

              <div className="row">
                <button className="btn btn-primary w-auto m-3" 
                    onClick={() => {
                        setItemToEdit("password");
                        setShowModal(true);
                        modalHandler(true);
                    }}>Change password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
