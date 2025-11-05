import React, { use, useEffect, useState } from "react";
import Header from "../component/Header";

function MyBookings() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  // Get logged-in user's email from localStorage
  const email = localStorage.getItem("email");

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      if (!email) {
        alert("You need to log in to view your orders.");
        return;
      }

      const response = await fetch("https://e-commersesalesproject.onrender.com/orders", {
        method: "POST", // ✅ Must be POST (backend expects POST)
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // ✅ Send email in body
      });

      const data = await response.json();
      setOrders(data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

let cancelorder=async(date)=>{
  let email=localStorage.getItem("email");
 
  let response=await fetch("https://e-commersesalesproject.onrender.com/cancel",{
    method:'post',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,Date:date})
  })
  let respdata=await response.json();
alert(JSON.stringify(respdata));
fetchOrders();
}

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Header />
      <center>
        <h1 style={{ color: "#6f42c1", margin: "20px 0" }}>Your Orders</h1>
      </center>

      {loading ? (
        <p className="text-center">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-muted">No orders found.</p>
      ) : (
        <div className="container">
          <div className="row g-3">
            {orders.map((order, index) => (
              <div
                key={order._id || index}
                className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
              >
                <div
                  className="card shadow-sm p-3"
                  style={{ width: "100%", borderRadius: "15px" }}
                >
                  <img
                    src={order.Image}
                    alt={order.Title}
                    className="card-img-top"
                    style={{
                      height: "150px",
                      objectFit: "contain",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "10px",
                    }}
                  />
                  <div className="card-body text-center text-md-start">
                    <h5 className="card-title text-dark fw-bold">
                      {order.Title}
                    </h5>
                    <p className="text-success fw-bold">₹{order.Price}</p>

                    <p>
                      <strong>Payment Type:</strong> {order.PaymentType}
                    </p>
                    <p>
                      <strong>Status:</strong> {order.Status}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(order.Date).toLocaleString()}
                    </p>

                    {order.OrderDetails &&
                      order.OrderDetails.length > 0 &&
                      order.OrderDetails.map((item, idx) => (
                        <div key={idx} className="text-start mb-2">
                          <p>
                            <strong>Name:</strong> {item.name}
                          </p>
                          <p>
                            <strong>Mobile:</strong> {item.mobile}
                          </p>
                          <p>
                            <strong>City:</strong> {item.city}
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className="text-end">
                    <button className="btn btn-danger" onClick={()=>
                      {
                        
                        cancelorder(order.Date);

                      }
                    }>
                     Cancel
                    </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
