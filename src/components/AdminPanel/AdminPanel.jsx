import React, { useContext, useEffect, useState } from 'react'
import './AdminPanel.css'
import { adminUrls } from '../../urls/urls';
import axios from 'axios';
import InventoryItem from './InventoryItem';
import { Modal } from 'bootstrap';

const AdminPanel = () => {
    const [adminTab,setAdminTab] = useState(0);
    const [inventory,setInventory] = useState([]);
    const [loading,setLoading] = useState(false);


    useEffect(() => {
      // run when inventory tab is selected in admin panel
      if (adminTab === 0) {
        setLoading(true);
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
            setInventory(response.data.content);
          } else {
            setLoading(false);
            setInventory([]);
            const modal = new Modal(
              document.getElementById("InvalidTokenModal"),
              { backdrop: "static", keyboard: false }
            );
            modal.show();
          }
        };

        fetchProducts();
      }
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
            }}
          >
            Inventory
          </li>
          <li
            key="1"
            className={adminTab === 1 ? "active" : ""}
            onClick={() => {
              setAdminTab(1);
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
              setLoading(true);
            }}
          >
            Change order status
          </li>
        </ul>
      </div>

      {/* displaying inventory if inventory category selected  */}
      <div className='wrap-inventory'>
        <div className="inventory">
        {adminTab === 0 && !loading ? (
          inventory ? (
            inventory.map((item, index) => {
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

{/* invalid token error Modal */}
<div
              className="modal fade"
              id="InvalidTokenModal"
              tabIndex="-1"
              aria-labelledby="InvalidTokenModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="InvalidTokenModalLabel">
                      Session Expired!
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Your session has expired, Please Login again!
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        window.location.replace("/login"); // refresh state
                        sessionStorage.clear();
                      }}
                    >
                      Go to Login
                    </button>
                  </div>
                </div>
              </div>
            </div>

    </div>
  );
}

export default AdminPanel
