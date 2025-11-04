import React from "react";
import logo from "../Images/logo.png";
import { useNavigate } from "react-router-dom";

function FrontContent() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg text-center p-4"
        style={{
          maxWidth: "500px",
          borderRadius: "20px",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(245,245,245,0.95))",
          boxShadow:
            "0 4px 15px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255,255,255,0.2)",
        }}
      >
        <div className="card-header bg-transparent border-0">
          <img
            src={logo}
            alt="E-Commerce Logo"
            className="card-img-top"
            style={{
              height: "220px",
              width: "220px",
              objectFit: "contain",
              margin: "0 auto",
            }}
          />
        </div>

        <div className="card-body">
          <h3
            className="card-title fw-bold mb-3"
            style={{
              color: "#ff5e62",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Welcome to MyShop Store 🛍️
          </h3>

          <p
            className="card-text text-muted"
            style={{
              fontSize: "16px",
              lineHeight: "1.5",
              padding: "0 15px",
            }}
          >
            Discover the latest products, exclusive offers, and amazing deals
            right at your fingertips. Shop smart and fast — your happiness
            delivered at your door!
          </p>

          <button
            className="btn btn-lg mt-3"
            style={{
              background: "linear-gradient(45deg, #36d1dc, #5b86e5)",
              color: "white",
              border: "none",
              borderRadius: "30px",
              padding: "10px 30px",
              fontSize: "18px",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onClick={() => navigate("/Login")}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(45deg, #5b86e5, #36d1dc)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(45deg, #36d1dc, #5b86e5)")
            }
          >
            🚀 Go to Login
          </button>
        </div>

        <div
          className="card-footer border-0 mt-3"
          style={{
            background: "transparent",
            color: "#6c757d",
            fontSize: "14px",
          }}
        >
          <p>✨ Secure • Fast • Reliable ✨</p>
          <p style={{ fontSize: "13px", margin: 0 }}>
            &copy; {new Date().getFullYear()} MyShop E-Commerce Store
          </p>
        </div>
      </div>
    </div>
  );
}

export default FrontContent;
