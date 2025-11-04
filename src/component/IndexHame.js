import React from 'react'
import FrontContent from './FrontContent'
import { useNavigate } from 'react-router-dom'

function IndexHame() {
    let navigate=useNavigate();
  return (
    <div>
<div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary p-3 shadow">
          <div className="container-fluid">
            <a className="navbar-brand fw-bold text-light fs-4" href="#">
              🛍️ MyShop
            </a>
            <form className="d-flex ms-auto" role="search">
              <button className="btn btn-light" type="submit"
              onClick={()=>{
                navigate("/")
              }}
              >

                Go To Land..
              </button>
            </form>
          </div>
        </nav>
</div>
<div>

</div>
    </div>
  )
}

export default IndexHame