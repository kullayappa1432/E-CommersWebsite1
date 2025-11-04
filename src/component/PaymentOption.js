import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function PaymentOption() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
  });
  useEffect(() => {
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);
  // ✅ Product & User Data
  let title = localStorage.getItem("title");
  let image = localStorage.getItem("productimage");
  let price = localStorage.getItem("price");
  let email = localStorage.getItem("email"); // 👈 store this during login/signup

  // ✅ Validate Form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter valid 10-digit mobile number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Enter valid 6-digit pincode";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Send Order to Backend after successful payment
  const SendData = async (paymentId) => {
    const data = {
      email,
      Image: image,
      Title: title,
      Price: price,
      OrderDetails: [formData],
      PaymentID: paymentId,
    };

    const response = await fetch("http://localhost:5000/onlinepayment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    alert(result.message);
  };

  // ✅ Razorpay Payment Handler
  const handlePayment = () => {
    if (!validateForm()) return;

    const options = {
      key: "rzp_live_RU24ZYlyJjpPSI", // 🧪 Replace with your Razorpay key
      amount: Number(price) * 100, // convert to paise
      currency: "INR",
      name: "My VSU Store",
      description: "Online Order Payment",
      image: "https://your-logo-url.com/logo.png",
      handler: async function (response) {
        alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);
        await SendData(response.razorpay_payment_id);
        navigate("/paymentsuccess");
      },
      prefill: {
        name: formData.name,
        email: email,
        contact: formData.mobile,
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ✅ Cancel button
  const handleCancel = () => navigate(-1);

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div
          className="card shadow-lg p-3"
          style={{
            width: "100%",
            maxWidth: "360px",
            borderRadius: "20px",
            backgroundColor: "#fff",
          }}
        >
          {/* Product Info */}
          <div className="d-flex align-items-center mb-3">
            <img
              src={image}
              alt={title}
              style={{
                height: "80px",
                width: "80px",
                objectFit: "contain",
                borderRadius: "10px",
                backgroundColor: "#f8f9fa",
                padding: "5px",
                marginRight: "10px",
              }}
            />
            <div className="text-start">
              <h6 className="mb-1 fw-bold text-dark">{title}</h6>
              <p className="mb-0 fw-bold" style={{ color: "#28a745" }}>
                ₹{price}
              </p>
            </div>
          </div>

          {/* Address Form */}
          <form>
            <input
              type="text"
              name="name"
              className="form-control mb-2"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}

            <input
              type="text"
              name="mobile"
              className="form-control mb-2"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <small className="text-danger">{errors.mobile}</small>}

            <input
              type="text"
              name="address"
              className="form-control mb-2"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <small className="text-danger">{errors.address}</small>
            )}

            <div className="d-flex gap-2 mb-2">
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="pincode"
                className="form-control"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
            {(errors.city || errors.pincode) && (
              <small className="text-danger d-block mb-2">
                {errors.city && errors.city + " "}
                {errors.pincode && errors.pincode}
              </small>
            )}
          </form>

          {/* Buttons */}
          <button
            className="btn btn-lg w-100 mb-2"
            style={{
              background: "linear-gradient(45deg, #ff512f, #dd2476)",
              border: "none",
              color: "white",
              fontWeight: "bold",
              borderRadius: "12px",
            }}
            onClick={handlePayment}
          >
            Proceed To Pay 💳
          </button>

          <button
            className="btn btn-lg w-100"
            style={{
              background: "linear-gradient(45deg, #bdc3c7, #2c3e50)",
              border: "none",
              color: "white",
              fontWeight: "bold",
              borderRadius: "12px",
            }}
            onClick={handleCancel}
          >
            Cancel ❌
          </button>
        </div>
      </div>
    </>
  );
}

export default PaymentOption;
