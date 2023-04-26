import React from "react";
import Layout from "../../components/layout/Layout";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout title="About > Z-Shop">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h2 className="mb-4">About Z-Shop</h2>
            <p className="lead mb-5">
              Z-Shop is an ecommerce site where you can buy a variety of goods,
              from electronics to clothing to home goods. We offer competitive
              prices, fast shipping, and excellent customer service. Our mission
              is to provide our customers with a convenient and enjoyable
              shopping experience.
            </p>
            <p className="mb-5">
              We were founded in 2020 by a group of entrepreneurs who saw the
              potential of online shopping. Since then, we have grown to become
              one of the largest online retailers in the world. Our team is made
              up of talented and passionate individuals who are dedicated to
              making Z-Shop the best it can be.
            </p>
            <Link to="#" className="btn btn-primary">
              Learn More
            </Link>
          </div>
          <div className="col-lg-6">
            <img
              src="https://via.placeholder.com/500x500"
              alt="About Us"
              className="img-fluid rounded-circle"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
