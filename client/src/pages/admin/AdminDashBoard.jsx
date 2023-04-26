import React from 'react'
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/menus/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashBoard = () => {
  const [auth]=useAuth();

  return (
    <Layout title={"Admin Dashboard > Z-SHOP"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="card m-3 p-3">
              <h5>Admin Name: {auth?.user?.name}</h5>
              <h5>Admin email: {auth?.user?.email}</h5>
              <h5>Admin Contact: {auth?.user?.phone}</h5>
              <h5>Admin Address: {auth?.user?.address}</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashBoard
