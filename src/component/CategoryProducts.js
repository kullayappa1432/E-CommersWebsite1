import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CategoryProducts() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [paymentType, setPaymentType] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch products when selectedCategory changes
  useEffect(() => {
    const url =
      selectedCategory === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${selectedCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [selectedCategory]);

  // Handle modal submission
  const handleSubmit = () => {
    if (paymentType === "online") {
      navigate("/PaymentOption");
    } else if (paymentType === "cod") {
      alert("You selected Cash on Delivery 🚚");
      navigate("/CashOnDilivery");
    } else {
      alert("Please select a payment option first ⚠️");
      return;
    }

    // Close modal safely
    const modal = document.getElementById("exampleModal");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) modalInstance.hide();
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="list-group shadow-sm rounded">
            <button
              className={`list-group-item list-group-item-action ${
                selectedCategory === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              All Products
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                className={`list-group-item list-group-item-action ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Right Products Grid */}
        <div className="col-md-9">
          <div className="row row-cols-2 row-cols-md-3 g-4">
            {products.map((product) => (
              <div className="col" key={product.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.image}
                    className="card-img-top p-3"
                    alt={product.title}
                    style={{ height: "200px", objectFit: "contain",cursor:'pointer' }}
                       onClick={() => {
                    localStorage.setItem("title", product.title);
                    localStorage.setItem("price", product.price);
                    localStorage.setItem("productimage", product.image);
                    navigate("/ClickingView")
                  }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title">{product.title}</h6>
                    <p className="card-text text-success fw-bold">
                      ₹{product.price}
                    </p>
                    <p>Free Delivery</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        localStorage.setItem("title", product.title);
                        localStorage.setItem("price", product.price);
                        localStorage.setItem("productimage", product.image);
                      }}
                    >
                      Order Now →
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <p className="text-center mt-3">No products found in this category.</p>
            )}
          </div>
        </div>
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
              <label>
                <input
                  type="radio"
                  value="online"
                  name="payment"
                  onChange={(e) => setPaymentType(e.target.value)}
                />{" "}
                Online Payment
              </label>
              <br />
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
    </div>
  );
}

export default CategoryProducts;
