import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/ProductPage"); // Redirect to products page
    }, 7000);

    return () => clearTimeout(timer); // Cleanup
  }, [navigate]);

  return (
    <div
      className="success-page"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 🎈 Balloons */}
      {[10, 30, 50, 70, 85].map((left, i) => (
        <div
          key={i}
          className="balloon"
          style={{ left: `${left}%`, animationDelay: `${i * 0.8}s`, backgroundColor: `hsl(${i * 60}, 70%, 60%)` }}
        ></div>
      ))}

      {/* 🎊 Confetti */}
      {[...Array(30)].map((_, i) => (
        <div key={i} className="confetti" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)` }}></div>
      ))}

      {/* ✨ Success Card */}
      <div
        className="text-center p-4 rounded-4 shadow-lg"
        style={{
          backgroundColor: "white",
          zIndex: 10,
          maxWidth: "360px",
          width: "90%",
        }}
      >
        <h1 style={{ color: "#28a745", fontSize: "2.5rem", fontWeight: "bold" }}>
          🎉 Payment Successful!
        </h1>
        <p style={{ color: "#555", fontSize: "16px", marginBottom: "20px" }}>
          Thank you for your purchase! You will be redirected to the Products Page shortly.
        </p>
        <p style={{ color: "#ff512f", fontWeight: "bold" }}>Redirecting in 5 seconds...</p>
      </div>

      {/* CSS Animations */}
      <style>{`
        /* Balloons */
        .balloon {
          position: absolute;
          bottom: -150px;
          width: 40px;
          height: 60px;
          border-radius: 50%;
          animation: floatUp 6s ease-in infinite;
          opacity: 0.8;
        }
        .balloon::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          width: 2px;
          height: 20px;
          background: #555;
          transform: translateX(-50%);
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-150px) scale(1.05); }
          100% { transform: translateY(-600px) scale(1); }
        }

        /* Confetti */
        .confetti {
          position: absolute;
          top: -10px;
          width: 8px;
          height: 8px;
          background-color: red;
          opacity: 0.9;
          border-radius: 2px;
          animation: fall 5s linear infinite;
        }
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(800px) rotate(360deg); opacity: 0; }
        }

        /* Sparkles */
        .success-page::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: sparkle 3s linear infinite;
        }
        @keyframes sparkle {
          0% { background-position: 0 0; }
          100% { background-position: 20px 20px; }
        }
      `}</style>
    </div>
  );
}

export default PaymentSuccess;
