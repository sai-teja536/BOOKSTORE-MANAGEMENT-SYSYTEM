import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Cart from '../display/Cart';
import Modal from'../Modal';
import {useCart} from '../components/ContextReducer';
function Navbar() {

let data=useCart();
const [cartView,setCartView]=useState(false);
const navigate=useNavigate();
 
const handleOut=()=>{
 localStorage.removeItem("authToken");
 navigate("/login")
}

  return (
    <div>
     <nav class="navbar navbar-expand-lg navbar-light bg-10">
     <div class="container-fluid">
     <Link class="navbar-brand" to="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB4WVCPCv4waTqjT_1_r-qlsY8mKoRKQDovLNPLJb81Wak7OFm3G41F66CyC5bP66KZIIwQ-NL9bE&usqp=CAU&ec=48665698" style={{"width":"120px","margin":"0px","height":"100%"}}></img></Link>
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/" style={{"font-size":"20px"}}>Home</Link>
        </li>
        {
         (localStorage.getItem("authToken"))?
          <>
          <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="#" style={{"font-size":"20px"}}>MyOrders</Link>
          </li>
          <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="#" style={{"font-size":"20px"}}>Profile</Link>
          </li>
          <h3 style={{"margin-left":"20vw","margin-top":"2vh","font-size":"25px"}}>
              Welcome! {(localStorage.getItem("userName"))}&#128522;</h3>
          </>
         :
          ""
        }
       </ul>
       {(!localStorage.getItem("authToken"))?
        <div class="d-flex">
          <Link class="btn bg-success text-white mx-1" to="/login">Login</Link>
          <Link class="btn bg-success text-white mx-1" to="/createuser">SignUp</Link>
        </div>
         :
         <div>
             <div class="btn bg-success text-white mx-1" onClick={()=>{setCartView(true)}}>Cart {" "}<Badge pill bg="danger">{data.length}</Badge></div>
{cartView?<Modal onClose={()=>setCartView(false)} style={{"font-size":"20px"}}><Cart /></Modal>:null}
              <div class="btn bg-success text-white mx-1" onClick={handleOut}>Logout</div>
         </div>
 
       }
     </div>
    </div>
    </nav>
    </div>
  );
}

export default Navbar;
