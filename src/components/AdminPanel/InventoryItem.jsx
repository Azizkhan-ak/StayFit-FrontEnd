import React, { useRef, useState } from "react";
import "./InventoryItem.css";
import { icons } from "../../assets/Asset";
import { Modal } from "bootstrap";
import { adminUrls } from "../../urls/urls";
import axios from "axios";

const InventoryItem = ({ item }) => {
  const [isLoading, setLoading] = useState(false);
  const[modalMessage,setModalMessgae] = useState('');

  const deleteInventoryProduct = async (itemId) => {
    setLoading(true);

    const deleteUrl = adminUrls.deleteInventoryItemByIdUrl + itemId;
    const response = await axios.post(
      deleteUrl,
      {}, // body (send empty object if no body is needed)
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (response && response.data && response.data.successful === true) {

      const confirmModalEl = document.getElementById("confirmDeleteModal");
      const confirmModalInstance = Modal.getInstance(confirmModalEl);
      if (confirmModalInstance) confirmModalInstance.hide();


      setModalMessgae("Delete operation");
      const modal = document.getElementById("successModal");
      new Modal(modal,{backdrop:"static",keyboard:false}).show();
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const editInventoryProduct = async ({ itemId }) => {};

  return (
    <div className="display-product">
      <div className="display-product-image">
        <img src={item.imgUrl} />
      </div>
      <div className="display-product-disc">
        <div className="display-prod-name">
          <h5>{item.name}</h5>
          <p>{item.desc}</p>
          <p>Items in Stock : {item.itemsInStock}</p>
          <p>Rs. {item.price.toLocaleString("en-PK")}/-</p>
        </div>

        <div className="display-product-delete">
          <img
            src={icons.deleteIcon}
            title="delete product from inventory"
            onClick={() => {
              const modal = document.getElementById("confirmDeleteModal");
              modal.setAttribute("itemtobedeletedid", item.id);
              new Modal(modal, { backdrop: "static", keyboard: false }).show();
            }}
          />
        </div>
        <div className="display-product-edit">
          <img
            src={icons.editIcon}
            title="Edit product details"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* success modal */}

    <div
  className="modal fade"
  id="successModal"
  tabIndex="-1"
  aria-labelledby="successModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content text-center">
      <div className="modal-header bg-success text-white">
        <h5 className="modal-title" id="successModalLabel">Success</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        {modalMessage} was successful!
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-success"
          data-bs-dismiss="modal"
          onClick={()=>{
                  window.location.replace("/adminPanel");
          }}
        >
          OK
        </button>
      </div>
    </div>
  </div>
</div>


      {/* modal to confirm deletion ! */}
      <div
        className="modal fade"
        id="confirmDeleteModal"
        tabIndex="-1"
        aria-labelledby="confirmDeleteModalLabel"
        aria-hidden="true"
        itemtobedeletedid=""
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-danger">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title" id="confirmDeleteModalLabel">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p className="fs-5 text-danger mb-0">
                Are you sure you want to <strong>permanently delete</strong>{" "}
                this product?
              </p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-secondary px-4"
                data-bs-dismiss="modal"
              >
                No, Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger px-4"
                onClick={() => {
                  const itemId = document
                    .getElementById("confirmDeleteModal")
                    .getAttribute("itemtobedeletedid");
                  // console.log("Item to be deleted is:", itemId);
                  deleteInventoryProduct(itemId);
                }}
              >
                {isLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
