import React from 'react'
import Layout from '../../components/layout/Layout';
import {FiMail,FiPhone,} from 'react-icons/fi'
import "./contact.css";
const Contact = () => {
  return (
    <Layout title="Contact > Z-Shop">
        <div className="row contact">
          <div className="col-md-6">
            <img src="/images/contact_map.png" alt="Map loading..." style={{width:'100%'}}/>

          </div>
          <div className="col-md-4">
            <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
            <p className="text-justify mt-3">
              Any query about any products? Feel free to contact us anytime. We are 24x7 available.
            </p>
            <p className="mt-3">
              <FiMail/> : contact.zhrifat@gmail.com
            </p>
            <p className="mt-3">
              <FiPhone/> : 01xxxxxxxxx
            </p>
          </div>
        </div>
    </Layout>
  )
}

export default Contact
