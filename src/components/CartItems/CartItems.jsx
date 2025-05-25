import React, { useContext } from "react";
import "./CartItems.css";
import { ApplicationContext } from "../ContextProvider/ContextProvider";
import { icons } from "../../assets/Asset";

const CartItems = () => {
  const { contextValue, selectedPayment, setSelectedPayment } =
    useContext(ApplicationContext);
  let deliveryCharges = 150;
  let tax = 0;
  let discount = 0;

  return (
    <div className="cart-items">
      {contextValue.cartItems &&
      Object.keys(contextValue.cartItems).length > 0 ? (
        <>
          <ul>
            {Object.entries(contextValue.cartItems).map((item, index) => (
              <li key={item[0]}>
                <div className="cart-item">
                  <div className="cart-item-img">
                    <img src={item[1]["imgUrl"]} />
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
          <div className="address">
            
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
                      name="payment"
                      value="ep"
                      checked={selectedPayment === "ep"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                    Easypaisa
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={selectedPayment === "cod"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                    Cash of delivery
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
