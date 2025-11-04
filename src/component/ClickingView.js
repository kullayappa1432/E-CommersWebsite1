import React from 'react'
import Header from './Header'
import ProductsPage from './ProductsPage'
import { useState } from 'react'
import * as bootstrap from "bootstrap";

function ClickingView() {
    let navigate=useState("");
    let image=localStorage.getItem("productimage")
    let title=localStorage.getItem("title");
    let price=localStorage.getItem("price");
  const [paymentType, setPaymentType] = useState("");
     const handleSubmit = () => {
        if (!paymentType) {
          alert("Please select a payment option first ⚠️");
          return;
        }
    
        const modalElement = document.getElementById("exampleModal");
        // ✅ Create a new modal instance
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
    
        // Navigate after modal is hidden
        modalElement.addEventListener(
          "hidden.bs.modal",
          () => {
            if (paymentType === "online") {
              navigate("/PaymentOption");
            } else if (paymentType === "cod") {
              alert("You selected Cash on Delivery 🚚");
              navigate("/CashOnDilivery");
            }
          },
          { once: true }
        );
    
        // Hide the modal
        modalInstance.hide();
      };
  return (
    <>
    <Header/>
    <div>
<div className="card mb-3" style={{textAlign:'center'}}>
  <img src={image} className="card-img-top" style={{height: "200px", objectFit: "contain"}} alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
       <p className="text-success fw-bold">₹{price}</p>
                <p>Free Delivery</p>
       <button
                  type="button"
                  className="btn btn-success w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    localStorage.setItem("title", title);
                    localStorage.setItem("price", price);
                    localStorage.setItem("productimage", image);
                  }}
                >Order Now </button>
  </div>
</div>
    </div>
    <ProductsPage/>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Select Payment Method
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <label className="me-3">
                <input
                  type="radio"
                  value="online"
                  name="payment"
                  onChange={(e) => setPaymentType(e.target.value)}
                />{" "}
                Online Payment
              </label>
              <label>
                <input
                  type="radio"
                  value="cod"
                  name="payment"
                  onChange={(e) => setPaymentType(e.target.value)}
                />{" "}
                Cash on Delivery
              </label>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClickingView