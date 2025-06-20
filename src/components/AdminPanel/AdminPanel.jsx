import React, { useContext, useEffect, useState } from 'react'
import './AdminPanel.css'
import { adminUrls } from '../../urls/urls';
import axios from 'axios';
import InventoryItem from './InventoryItem';

const AdminPanel = () => {
    const [adminTab,setAdminTab] = useState(0);
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);


    useEffect(() => {
      const fetchProducts = async () => {
        let url = adminUrls.listInventoryUrl;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        if (
          response &&
          response.data.successful === true &&
          response.data.content.length > 0
        ) {
          setLoading(false);
          setProducts(response.data.content);
        } else {
          setLoading(false);
          setProducts([]);
        }
      };

      fetchProducts();
    }, [adminTab]);


  return (
    <div className="admin-panel">
      <div className="admin-navbar">
        <h3>Manage Store</h3>
        <br></br>
        <ul>
          <li
            key="0"
            className={adminTab === 0 ? "active" : ""}
            onClick={() => {
              setAdminTab(0);
              setProducts([]);
              setLoading(true);
            }}
          >
            Inventory
          </li>
          <li
            key="1"
            className={adminTab === 1 ? "active" : ""}
            onClick={() => {
              setAdminTab(1);
              setProducts([]);
              setLoading(true);
            }}
          >
            Add Product
          </li>
          <li
            key="2"
            className={adminTab === 2 ? "active" : ""}
            onClick={() => {
              setAdminTab(2);
              setProducts([]);
              setLoading(true);
            }}
          >
            Edit/Delete Product
          </li>
          <li
            key="3"
            className={adminTab === 3 ? "active" : ""}
            onClick={() => {
              setAdminTab(3);
              setProducts([]);
              setLoading(true);
            }}
          >
            Orders History
          </li>
          <li
            key="4"
            className={adminTab === 4 ? "active" : ""}
            onClick={() => {
              setAdminTab(4);
              setProducts([]);
              setLoading(true);
            }}
          >
            Change order status
          </li>
        </ul>
      </div>

      {/* displaying inventory if inventory tab selected  */}
      <div className='wrap-inventory'>
        <div className="inventory">
        {!loading ? (
          products ? (
            products.map((item, index) => {
              return <InventoryItem key={index} item={item} />;
            })
          ) : (
            <h4>Inventory Empty</h4>
          )
        ) : (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
      </div>
      </div>
    
    </div>
  );
}

export default AdminPanel
