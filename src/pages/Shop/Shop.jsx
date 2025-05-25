import React, { useContext, useEffect, useState } from 'react'
import './Shop.css'
import { assets } from '../../assets/Asset'
import DisplayProduct from './DisplayProduct';
import { ApplicationContext } from '../../components/ContextProvider/ContextProvider';
import { ClipLoader } from 'react-spinners';



const Shop = () => {

  const {category,setCategory} = useContext(ApplicationContext);
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect( ()=>{
    const fetchProducts = async ()=>{
      let url = "http://localhost:8080/stayfit/products.json/getProducts?category="+category;
      const response = await fetch (url);
      const responseJson = await response.json();
      if(responseJson && responseJson.successful === true && responseJson.content.length>0){
        setLoading(false);
        setProducts(responseJson.content);
      }
      else{
        setLoading(false);
        setProducts([]);
      }
    }

    fetchProducts();
    
  },[category] );

  return (
    <>
      <div className="shop">
        <div className="shop-navbar">
          <h3>Products Categories</h3>
          <ul>
            <li
              key="0"
              className={category === 0 ? "active" : ""}
              onClick={() => {
                setCategory(0);
                setProducts([]);
                setLoading(true);
              }}
            >
              All
            </li>
            <li
              key="1"
              className={category === 1 ? "active" : ""}
              onClick={() => {
                setCategory(1);
                setProducts([]);
                setLoading(true);
              }}
            >
              Cardio Equipment
            </li>
            <li
              key="2"
              className={category === 2 ? "active" : ""}
              onClick={() => {
                setCategory(2);
                setProducts([]);
                setLoading(true);
              }}
            >
              Commercial Equipment
            </li>
            <li
              key="3"
              className={category === 3 ? "active" : ""}
              onClick={() => {
                setCategory(3);
                setProducts([]);
                setLoading(true);
              }}
            >
              Fitness Accessories
            </li>
            <li
              key="4"
              className={category === 4 ? "active" : ""}
              onClick={() => {
                setCategory(4);
                setProducts([]);
                setLoading(true);
              }}
            >
              Weight Training
            </li>
          </ul>
        </div>
        <div className="products">
          <form className="shop-search-product-form">
            <div>
              <input
                type="text"
                placeholder="search products..."
                className="shop-search-product-input"
              />
            </div>
            <div>
              <img
                className="shop-search-product-icon"
                src={assets.icons[0].path}
              />
            </div>
          </form>

          <div className="shop-products">
            {!loading ? (
              products ? (
                products.map((item, index) => {
                  return <DisplayProduct key={index} item={item} />;
                })
              ) : (
                <h4>No Products Found</h4>
              )
            ) : (
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop
