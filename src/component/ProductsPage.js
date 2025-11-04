import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";

function ProductsPage() {
  const navigate = useNavigate();
  const [Data, SetData] = useState([]);
  const [paymentType, setPaymentType] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => SetData(data))
      .catch((err) => console.error(err));
  }, []);

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
      <div className="row row-cols-2 row-cols-md-3 g-4 m-2">
        {Data.map((n) => (
          <div className="col" key={n.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={n.image}
                className="card-img-top p-3"
                alt={n.title}
                style={{ height: "200px", objectFit: "contain" ,cursor:"pointer"}}
                 onClick={() => {
                    localStorage.setItem("title", n.title);
                    localStorage.setItem("price", n.price);
                    localStorage.setItem("productimage", n.image);
                    navigate("/ClickingView")
                  }}
              
              />
              <div className="card-body text-center">
                <h6 className="card-title">{n.title}</h6>
                <p className="text-success fw-bold">₹{n.price}</p>
                <p>Free Delivery</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    localStorage.setItem("title", n.title);
                    localStorage.setItem("price", n.price);
                    localStorage.setItem("productimage", n.image);
                  }}
                >
                  Order Now →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
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
  );
}

export default ProductsPage;
