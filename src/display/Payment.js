import React,{useState} from 'react';
import StripeCheckout from 'react-stripe-checkout'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Payment(props){
//toast.configure()


async function handleToken(token,addresses){
  const response=await fetch("http://localhost:5000/payment",{token,props});
  console.log(response.status)
  if(response.status===200)
  {
    alert("Payment is Completed")
  }else{
    alert("Payment is completed")
  }
}

return(
  <>
  <div className='container'>
   <br /><br />
   <h1 className="text-center">Pay the Bill to Edufund. Enjoy your day!</h1>
   <br /><br />
   <div className='form-group container m-5'>
   <StripeCheckout
    className="center"
    stripeKey="pk_test_51N6bpESFc5hmqjNJwMDS55lfJ5PU6eGYt2BfWo1D2QzqnWwK4qI3YOJSM9YQHOB2NebjpJrxEXD22sMWKHxDac8r00FIIuik47"
    token={handleToken}
    amount={localStorage.getItem("totPrice")}
    name={localStorage.getItem("userEmail")}
    billingAddress
    shippingAddress 
   /> 
  </div>
  </div>
  </>
)
}

export default Payment