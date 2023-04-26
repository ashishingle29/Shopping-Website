import React from 'react';
import { Link } from 'react-router-dom';
import "./footer.css";
const Footer = () => {
  return (
    <footer>
      <h5 className='text-center'>All rights reserved &copy; z-shop</h5>
      <p className='text-center mt-3'>
        <Link to="/about">About</Link>
        |
        <Link to="/privacy-policy">Privacy Policy</Link>
        |
        <Link to="/contact">Contact</Link>
      </p>
    </footer>
  )
}
 
export default Footer
