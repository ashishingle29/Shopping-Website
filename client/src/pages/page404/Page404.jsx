import React from 'react'
import Layout from '../../components/layout/Layout';
import "./page404.css";
import { Link,useNavigate } from 'react-router-dom';
const Page404 = () => {
  const navigate=useNavigate();
  return (
    <Layout title="404 error">
      <div className="p404">
        <h1>404</h1>
        <h3>Oops! page not found.</h3>
        <Link onClick={()=>{navigate(-1)}} className='btn'>Go back</Link>
      </div>
    </Layout>
  )
}

export default Page404;
