import React, { useRef} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from '../Images/logo.png';
import IndexHame from "./IndexHame";



function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^\d{8}$/;

  // Handle Google login callback
  // Load Google script dynamically


  // Handle manual login
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("Password must be 8 digits.");
      return;
    }

    try {
      const res = await fetch("https://e-commersesalesproject.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const message = await res.text();
      alert(message);

      if (res.ok) {
        localStorage.setItem("email", email);
        navigate("/Home");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
    <IndexHame/>
    <center>
  <div className="container-fluid py-4 m-2">
    <div className="row justify-content-center align-items-center">

      {/* 🔹 Left Section (Logo Card) */}
      <div className="col-12 col-md-5 mb-4 mb-md-0 d-flex justify-content-center">
        <div id="f1" className="card shadow-lg border-0 text-center">
          <img
            src={logo}
            className="card-img-top p-3"
            alt="Logo"
            style={{ height: "200px", objectFit: "contain" }}
          />
          <div className="card-body">
            <p className="card-text text-light">
              Welcome to MyShop — explore the best products and deals online.
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Right Section (Login Form) */}
      <div className="col-12 col-md-5 d-flex justify-content-center">
        <form
          id="login"
          onSubmit={handleLogin}
          className="p-4 shadow bg-white rounded w-100"
          style={{ maxWidth: "380px" }}
        >
          <h4 className="mb-3 text-center text-primary fw-bold">Login</h4>

          {/* Email */}
          <div className="mb-3 text-start">
            <label className="form-label">Email address</label>
            <input
              ref={emailRef}
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={() => {
                emailRef.current.style.borderColor = emailRegex.test(
                  emailRef.current.value
                )
                  ? "green"
                  : "red";
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input
              ref={passwordRef}
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={() => {
                passwordRef.current.style.borderColor = passwordRegex.test(
                  passwordRef.current.value
                )
                  ? "green"
                  : "red";
              }}
            />
          </div>

          {/* Links */}
          <div className="d-flex justify-content-between mb-3">
            <a href="#" className="small text-decoration-none">
              Forgot Password?
            </a>
            <a
              href="#"
              className="small text-decoration-none"
              onClick={() => navigate("/SignUp")}
            >
              Sign Up
            </a>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-success w-100 mb-3">
            Login
          </button>

         
        </form>
      </div>
    </div>
  </div>
</center>
</>
  );
}

export default Login;
