import React from 'react';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import "./navbarHeader.css"
import {TiShoppingCart} from 'react-icons/ti';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import SearchForm from '../forms/SearchForm';
import useCategory from '../../hooks/useCategory';
import {Badge} from 'antd';
import { useCart } from '../../context/cart';
import { SearchProvider } from '../../context/search';
const Navbar = () => {
  const [auth,setAuth]=useAuth();
  const [cart]=useCart();
  const categories=useCategory();
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('auth');
    setAuth({
      ...auth,
      user:null,
      token:""
    });
    toast.success("Logout Successful")
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <span>z-shop</span><TiShoppingCart/>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchForm/>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to={`/categories`}>All Categories</Link></li>
                {categories.map((itm)=>(
                  <li key={itm._id}><Link className="dropdown-item" to={`/category/${itm.slug}`}>{itm.name}</Link></li>
                ))}
              </ul>
            </li>

          {auth.user?
            (
            <>

              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/dashboard/admin"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to={`/dashboard/${auth?.user?.role>0?'admin/profile':'user/profile'}`} className="dropdown-item">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
            ):
            (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
            </>
            )
            
          }
            <li className="nav-item">
                <Badge count={cart?.length} showZero>
              <NavLink className="nav-link" to="/cart">
                  Cart
              </NavLink>
                </Badge>
            </li>
            
          </ul>
        </div>
          
      </div>
    </nav>
  );
}

export default Navbar;
