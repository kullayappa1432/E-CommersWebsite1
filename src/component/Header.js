import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import IndexHame from "./IndexHame";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import prof from "./photos/Prof.png"
import { useState } from "react";
function Header() {
  let [Url,setUrl]=useState(prof);
  let navigate=useNavigate();

  let email=localStorage.getItem("email");
  let name=email.split("@")[0];
  return (
    <>
    <div>
      <div className="full-bg">
        {/* 🔹 Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary p-3 shadow">
          <div className="container-fluid">
            <a className="navbar-brand fw-bold text-light fs-4" href="#">
            <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
  <i className="fi fi-br-menu-burger" style={{color:'white',padding:'20px',marginTop:'10px'}} ></i></a>
 MyShop
            </a>
            <form className="d-flex ms-auto" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <button className="btn btn-light" type="submit">
                🔍
              </button>
            </form>
          </div>
        </nav>

        {/* 🔹 Fixed Bottom Icon Bar (Mobile) */}
        <div className="text-center my-2 mobile-bottom-bar" id="MenuContent">
  <div className="menu-buttons d-flex justify-content-evenly flex-wrap">
    <button
      className="btn"
      title="Home"
      onClick={()=>{
        navigate("/ProductPage");
      }}
    >
      <i className="fa fa-home" style={{fontSize:'30px',color:'white'}}></i>
    </button>
    <button
      className="btn"
      title="Products"
      onClick={()=>{
        navigate("/Catogiry")
      }}
    >
       <i className="fa-solid fa-layer-group" style={{ fontSize: "30px",color:'white' }}></i>
    </button>
    <button
      className="btn"
      title="Categories"
    ><i className="fa fa-heart" style={{fontSize:'30px',color:'white'}}></i>

    </button>


    <button
      className="btn"
      title="Bookings"
      onClick={()=>{
        navigate("/mybookings");
      }}
    >
      <i className="fa fa-cart-plus" style={{fontSize:'30px',color:'white'}}></i>
    </button>
  </div>
</div>

      </div>
      </div>



      <div className="offcanvas offcanvas-start" style={{width:'60%'}} tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Your Profile</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <div>
      <img src={Url} style={{borderRadius:'30%',width:'100%',height:'150px'}}></img><br></br>
       <input
        type="file"
        id="fileInput"
        style={{ display: "none",marginTop:'20px' }}
        onChange={(e) => {
          const ur = URL.createObjectURL(e.target.files[0]);
          setUrl(ur);
        }}
      />

      {/* Custom button */}
      <label
        htmlFor="fileInput"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        📁 Choose File
      </label>

    </div>
    <div>
      <h1>Hello Mister {name} </h1>
    </div>
    <div>
     🛍️ Welcome to MyStore! Discover trendy styles, smart gadgets, and great deals — all handpicked just for you. 💖 Stay awesome, keep shopping! 🚀
    </div>
<div>

  <button className="btn btn-success" onClick={()=>{
    navigate("/")
  }}>
    LogOut
  </button>
</div>
  </div>
</div>
    </>
  );
}

export default Header;
