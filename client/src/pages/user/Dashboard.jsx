import React from 'react'
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from './../../components/menus/UserMenu';

const Dashboard = () => {
    const [auth,setAuth]=useAuth();
    return (
        <Layout title="Dashboard - Z-SHOP">
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9 my-3">
                        <div className="card m-3 p-3">
                            <h5>Name: {auth?.user?.name}</h5>
                            <h5>Email: {auth?.user?.email}</h5>
                            <h5>Contact: {auth?.user?.phone}</h5>
                            <h5>Address: {auth?.user?.address}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
