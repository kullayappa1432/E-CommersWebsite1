import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import IndexHame from "./IndexHame";

const CLIENT_ID =
  "1043646008179-hq3943hpnrvlornn1msg4cnvq0bdf5cl.apps.googleusercontent.com";

// Decode Google token
function decodeJwtResponse(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

function SignUp() {
  const mail = useRef();
  const password = useRef();
  const password1 = useRef();
  const navigate = useNavigate();

  const handleCredentialResponse = (response) => {
    const data = decodeJwtResponse(response.credential);
    alert(`Welcome ${data.name}!\nEmail: ${data.email}`);
  };

  // Load Google script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Validation regex
  const pswRegex = /^\d{8}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const passwordValidation = (value, inputRef) => {
    inputRef.current.style.borderColor = pswRegex.test(value) ? "green" : "red";
  };

  const emailValidation = (value, inputRef) => {
    inputRef.current.style.borderColor = emailRegex.test(value)
      ? "green"
      : "red";
  };

  // ✅ Full Validation on Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = mail.current.value.trim();
    const passValue = password.current.value.trim();
    const passConfirm = password1.current.value.trim();

    // Email validation
    if (!emailRegex.test(emailValue)) {
      alert("❌ Please enter a valid email address.");
      mail.current.focus();
      return;
    }

    // Password validation
    if (!pswRegex.test(passValue)) {
      alert("❌ Password must be exactly 8 digits.");
      password.current.focus();
      return;
    }

    // Confirm password check
    if (passValue !== passConfirm) {
      alert("❌ Passwords do not match!");
      password1.current.focus();
      return;
    }

    // If valid, submit to server
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailValue,
        password: passValue,
      }),
    });

    const data = await res.text();
    alert(data);
  };

  return (
    <>
      <IndexHame />
      <div className="container-fluid py-4">
        <div className="row justify-content-center align-items-center">
          {/* Left Section */}
          <div className="col-12 col-md-5 mb-4 mb-md-0 d-flex justify-content-center">
            <div
              id="f1"
              className="card shadow-lg border-0 text-center bg-primary text-light"
              style={{ borderRadius: "10px" }}
            >
              <img
                src={logo}
                className="card-img-top p-3"
                alt="Shop Logo"
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body">
                <p className="card-text">
                  Join <b>MyShop</b> today and enjoy exclusive deals, discounts,
                  and more. Your best shopping partner!
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-12 col-md-5 d-flex justify-content-center">
            <form
              id="signup"
              onSubmit={handleSubmit}
              className="p-4 shadow bg-white rounded w-100"
              style={{ maxWidth: "380px" }}
            >
              <h3 className="mb-3 text-center text-primary fw-bold">Sign Up</h3>

              <div className="mb-3 text-start">
                <label className="form-label">Email address</label>
                <input
                  ref={mail}
                  type="email"
                  onChange={(e) => emailValidation(e.target.value, mail)}
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3 text-start">
                <label className="form-label">Password</label>
                <input
                  ref={password}
                  type="password"
                  onChange={(e) =>
                    passwordValidation(e.target.value, password)
                  }
                  className="form-control"
                  placeholder="Enter password"
                />
                <small className="text-muted">
                  Must be exactly 8 digits (e.g., 12345678)
                </small>
              </div>

              <div className="mb-3 text-start">
                <label className="form-label">Confirm Password</label>
                <input
                  ref={password1}
                  type="password"
                  onChange={(e) =>
                    passwordValidation(e.target.value, password1)
                  }
                  className="form-control"
                  placeholder="Re-enter password"
                />
              </div>

              <div className="mb-3 text-end small">
                <label>
                  Already have an account?{" "}
                  <a
                    href="#"
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={() => navigate("/Login")}
                  >
                    Login
                  </a>
                </label>
              </div>

              <button type="submit" className="btn btn-success w-100 mb-3">
                Sign Up
              </button>

              <h6 className="text-muted text-center">— Or —</h6>

              <div
                style={{
                  height: "40px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div id="google-signin-button"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
