import React, { useEffect, useState } from 'react'
import './Shop.css'
import { assets } from '../../assets/Asset'
import DisplayProduct from './DisplayProduct';



const Shop = () => {

  const [category,setCategory] = useState(0);
  const [products,setProducts] = useState([]);

  useEffect( ()=>{
    const fetchProducts = async ()=>{
      let url = "http://localhost:8080/stayfit/products.json/getProducts?category="+category;
      const response = await fetch (url);
      const responseJson = await response.json();
      if(responseJson && responseJson.successful === true && responseJson.content.length>0){
        setProducts(responseJson.content);
      }
      else{
        setProducts([]);
      }
    }

    fetchProducts();
    
  },[category] );

  return (
    <>
    <div className='shop'>
      <div className='shop-navbar'>
        <h3>Products Categories</h3>
        <ul>
          <li key='0' className={category === 0 ? 'active':''} onClick={ ()=>{setCategory(0)} } >All</li>
          <li key='1' className={category === 1 ? 'active':''} onClick={ ()=>{setCategory(1)} } >Cardio Equipment</li>
          <li key='2' className={category === 2 ? 'active':''} onClick={ ()=>{setCategory(2)} } >Commercial Equipment</li>
          <li key='3' className={category === 3 ? 'active':''} onClick={ ()=>{setCategory(3)} } >Fitness Accessories</li>
          <li key='4' className={category === 4 ? 'active':''} onClick={ ()=>{setCategory(4)} } >Weight Training</li>
        </ul>
      </div>
        <div className='products'>
          <form className='shop-search-product-form'>
            <div>
              <input type='text' placeholder='search products...' className='shop-search-product-input' />
            </div>
            <div>
              <img className='shop-search-product-icon' src={assets.icons[0].path} />
            </div>
          </form>
          
          <div className='shop-products'>
             { products? products.map( (item,index)=>{
              return <DisplayProduct item = {item}/>
             } ):<h4>No Products Found</h4> }
          </div>
        
        </div>
    </div>
    </>
  )
}

export default Shop
