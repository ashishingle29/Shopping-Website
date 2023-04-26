import React from 'react'
import { useSearch } from '../../context/search';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/cart';

const Search = () => {
  const [values,setValues]=useSearch();
  const [cart,setCart]=useCart();
  const navigate=useNavigate();
  return (
    <Layout title="Search Result">
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>{values?.results.length<1?"No products found.":`Found ${values?.results.length} results` }</h6>
          
          <div className="d-flex flex-wrap justify-content-center">
            {values.results?.map((item) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={item.name}
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND_API}/api/product/get-photo/${item._id}`}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div className="card-title">{item.name}</div>
                  <div className="card-text">{item.description.substring(0,30)}...</div>
                  <div className="card-text mb-3 fw-bold mt-2">
                    MRP. {item.price}
                  </div>
                  <div className="btns">
                    <button
                      className="btn btn-info m-1"
                      onClick={() => navigate(`/product/${item.slug}`)}
                    >
                      More details
                    </button>
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => {
                        setCart([...cart,item]);
                        localStorage.setItem('cart',JSON.stringify([...cart,item]))
                        toast.success("Item added to cart.");
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Search
