import React from 'react'
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
    <div className="text-center">
            <h3>Admin Menu</h3>
        <div className="list-group">
            <NavLink to="/dashboard/admin/profile" className="list-group-item list-group-item-action">Profile</NavLink>
            <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Category</NavLink>
            <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Product</NavLink>
            <NavLink to="/dashboard/admin/carousel" className="list-group-item list-group-item-action">Carousel</NavLink>
            <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">Manage Orders</NavLink>
            <NavLink to="/dashboard/admin/user-list" className="list-group-item list-group-item-action">User List</NavLink>
        </div>
    </div>
    </>
  )
}

export default AdminMenu
