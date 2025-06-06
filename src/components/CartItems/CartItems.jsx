import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ApplicationContext } from "../ContextProvider/ContextProvider";
import { icons } from "../../assets/Asset";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import axios from "axios";
import { ordersUrls } from "../../urls/urls";
import CheckOutForm from "../Checkout/CheckOutForm";

const CartItems = () => {
  const { contextValue, selectTabValue } = useContext(ApplicationContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    orderNotes: "",
    paymentMethod: "1",
    city: "",
    country: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPayload, setOrderPayload] = useState(null);

  let deliveryCharges = 150;
  let tax = 0;
  let discount = 0;

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  async function onPaymentSuccess(paymentIntent) {
    try {
      const payload = {
        ...orderPayload,
        paymentDto: {
          paymentIntentId: paymentIntent.id,
          created: paymentIntent.created,
          currency: paymentIntent.currency,
          amount: paymentIntent.amount,
        },
      };
      const response = await axios.post(ordersUrls.placeOrder, payload);
      if (response.error) {
         const modal = new Modal(document.getElementById("orderErrorModal"), {
          backdrop: "static", // prevents click outside to close
          keyboard: false, // disables ESC key
        });
        modal.show();
      } else {
        const modal = new Modal(document.getElementById("orderSuccessModal"), {
          backdrop: "static", // prevents click outside to close
          keyboard: false, // disables ESC key
        });
        modal.show();
      }
    } catch (error) {
       const modal = new Modal(document.getElementById("orderErrorModal"), {
          backdrop: "static", // prevents click outside to close
          keyboard: false, // disables ESC key
        });
        modal.show();
    }
  }

  function onPaymentError(paymentIntent) {
     const modal = new Modal(document.getElementById("orderErrorModal"), {
          backdrop: "static", // prevents click outside to close
          keyboard: false, // disables ESC key
        });
        modal.show();
  }

  const placeOrder = async () => {
    setIsLoading(true);
    const payLoad = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      country: formData.country,
      deliveryAddress: formData.address,
      orderNotes: formData.orderNotes,
      paymentMethod: formData.paymentMethod,
      products: [],
    };

    Object.entries(contextValue.cartItems).forEach(([key, value]) => {
      payLoad.products.push({
        id: key,
        quantity: value.numberOfItems,
        price: value.priceOfItem,
      });
    });

    try {
      if (formData.paymentMethod === "2") {
        const response = await axios.post(ordersUrls.placeOrder, payLoad);
        if(response.error){
           // Show modal
        const modal = new Modal(document.getElementById("orderErrorModal"), {
          backdrop: "static", // prevents click outside to close
          keyboard: false, // disables ESC key
        });
        modal.show();
        }
        else{
           // Show modal
        const modal = new Modal(document.getElementById("orderSuccessModal"), {
          backdrop: "static", // prevents click outside to close
          keyboard: false, // disables ESC key
        });
        modal.show();
        }
      } else {
        setOrderPayload(payLoad);
        setShowCheckout(true);
        //online payment via card
      }
    } catch (error) {
      console.log(" Something went wrong : " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cart-items">
      {contextValue.cartItems &&
      Object.keys(contextValue.cartItems).length > 0 ? (
        <>
          <ul>
            <h1>Your Cart</h1>
            {Object.entries(contextValue.cartItems).map((item, index) => (
              <li key={item[0]}>
                <div className="cart-item">
                  <div className="image-zoom-wrapper">
                    <img src={item[1]["imgUrl"]} className="zoom-image" />
                  </div>
                  <div className="cart-item-desc">
                    <h4>{item[1]["name"]}</h4>
                    <p>{item[1]["desc"]}</p>
                    <p>
                      Rs. {item[1]["priceOfItem"].toLocaleString("en-PK")}/-
                    </p>
                    <p> Number Of Items : {item[1]["numberOfItems"]}</p>
                  </div>
                  <div className="cart-item-amount">
                    <h2>
                      Rs.{" "}
                      {(
                        item[1]["priceOfItem"] * item[1]["numberOfItems"]
                      ).toLocaleString("en-PK")}
                      /-
                    </h2>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <hr />
          <div className="customer-details">
            <h1>Shipping/Contact Details</h1>
            <div className="container mt-5" style={{ maxWidth: "500px" }}>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="John Doe"
                    required
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    required
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="03xx-xxxxxxx"
                    required
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="karachi"
                    required
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder="Pakistan"
                    required
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Delivery Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    rows="3"
                    placeholder="Street, City, ZIP"
                    required
                    onChange={(e) => onChangeHandler(e)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    rows="2"
                    required
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
              </form>
            </div>
          </div>
          <hr />
          <div className="billing">
            <h1>Billing</h1>
            <div className="billing-details">
              <div className="payment-method">
                <form>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="paymentMethod"
                      value="1"
                      checked={formData["paymentMethod"] == "1"}
                      onChange={(e) => onChangeHandler(e)}
                    />
                    Pay Online (via Debit/Credit Card)
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="paymentMethod"
                      value="2"
                      checked={formData["paymentMethod"] == "2"}
                      onChange={(e) => onChangeHandler(e)}
                    />
                    Cash on delivery
                  </label>
                </form>
              </div>
              <div className="billing-details">
                <div>
                  <div className="billing-details-total">
                    <p>Subtotal:</p>
                    <p>
                      {Object.values(contextValue.cartItems)
                        .reduce(
                          (sum, item) =>
                            sum + item["numberOfItems"] * item["priceOfItem"],
                          0
                        )
                        .toLocaleString("en-PK")}{" "}
                      /-
                    </p>
                  </div>
                  <div className="billing-details-total">
                    <p>Discount:</p>
                    <p>{discount}%</p>
                  </div>
                  <div className="billing-details-total">
                    <p>Tax:</p>
                    <p>{tax}/-</p>
                  </div>
                  <div className="billing-details-total">
                    <p>Delivery Charges:</p>
                    <p>Rs: {deliveryCharges}/-</p>
                  </div>
                  <div className="billing-details-total">
                    <p>Total:</p>
                    <p>
                      Rs:{" "}
                      {(
                        Object.values(contextValue.cartItems).reduce(
                          (sum, item) =>
                            sum + item["numberOfItems"] * item["priceOfItem"],
                          0
                        ) +
                        deliveryCharges -
                        tax
                      ).toLocaleString("en-PK")}
                      /-
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div
            style={{
              justifyContent: "center",
              justifyItems: "center",
              display: "flex",
              marginBottom: "50px",
            }}
          >
            <button
              type="button"
              className="btn btn-success"
              onClick={placeOrder}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </button>

{/* {This model is for success } */}
            <div
              className="modal fade"
              id="orderSuccessModal"
              tabIndex="-1"
              aria-labelledby="orderSuccessModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="orderSuccessModalLabel">
                      Order Placed
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        selectTabValue("home");
                        window.location.replace("/"); // refresh state
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    Your order has been placed successfully! Check email for
                    details
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        selectTabValue("home");
                        window.location.replace("/"); // refresh state
                      }}
                    >
                      Go to Home
                    </button>
                  </div>
                </div>
              </div>
            </div>

{/* {This model is for error message} */}

<div
              className="modal fade"
              id="orderErrorModal"
              tabIndex="-1"
              aria-labelledby="orderErrorModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="orderErrorModalLabel">
                      Order Failed 
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Your order has been failed, Please call at 03XXXXXXXXXX for further details.
                    we are sorry for inconvenience 
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        selectTabValue("home");
                        window.location.replace("/"); // refresh state
                      }}
                    >
                      Go to Home
                    </button>
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* when onjine payment metod is selected */}
          {showCheckout && (
            <CheckOutForm
              payLoad={orderPayload}
              onPaymentSuccess={onPaymentSuccess}
              onPaymentError={onPaymentError}
            />
          )}
        </>
      ) : (
        <div className="cart-item-empty">
          <img src={icons.emptyCart} />
        </div>
      )}
    </div>
  );
};

export default CartItems;
