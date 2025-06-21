import React from "react";
import "./InventoryItem.css";
import { icons } from "../../assets/Asset";
import { Modal } from "bootstrap";
import { adminUrls } from "../../urls/urls";
import axios from "axios";

const InventoryItem = ({ item }) => {
  const deleteInventoryProduct = async ({ itemId }) => {

    const deleteUrl = adminUrls.deleteInventoryItemByIdUrl+itemId;
    const response = await axios.delete(deleteUrl,{ Authorization: `Bearer ${sessionStorage.getItem("token")}`});

    if(response && response.data && response.data.successful === true ){
      
    }
    else{

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
                data-bs-dismiss="modal"
                onClick={() => {
                  const itemId = document
                    .getElementById("confirmDeleteModal")
                    .getAttribute("itemtobedeletedid");
                  // console.log("Item to be deleted is:", itemId);
                  deleteInventoryProduct(itemId);
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
