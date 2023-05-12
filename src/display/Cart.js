import React from 'react'
import {useCart,useDispatchCart} from '../components/ContextReducer';
import {useNavigate} from 'react-router-dom'
import Payment from './Payment'

function Cart(){
   const navigate=useNavigate();
   let data=useCart(); 
   let dispatch=useDispatchCart();
   if(data.length===0)
   {
     return(
     <div>
     <div class='m-5 w-100 text-center fs-3'>
         The Cart is Empty!
     </div>
     </div>)
   }
   
  const handleCheckOut=async()=>{
   let userEmail=localStorage.getItem("userEmail");  
   let response=await fetch("http://localhost:5000/api/myOrderData",{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({order_data:data,email:userEmail,order_date:new Date().toDateString()})
     });
     console.log("order response"+response);
     if(response.status===200)
     {
      dispatch({type:"DROP"})
     }
     navigate("/pay")
  }
 
   var totalPrice=data.reduce((total,book)=>total+Number(book.price*85),0)
   return(
 
     <div>
       <div class='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'> 
           <table class='table table-hover'>
              <thead class="text-success fs-4">
               <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Amount</th>
                  <th scope='col'>Delete</th>
               </tr>
              </thead>
              <tbody>
                 {data.map((book,index)=>(
                    <tr>
                      <th scope='row' style={{"color":"white"}}>{index+1}</th>
                      <td style={{"color":"white"}}>{book.name}</td>
                      <td style={{"color":"white"}}>{book.qty}</td>
                      <td style={{"color":"white"}}>{book.price*85}</td>
                      <td style={{"color":"white"}}><button type="button" style={{"color":"white"}} class="btn p-0" onClick={()=>{dispatch({type:"REMOVE",index:index})}}>Delete</button></td></tr>
               ))}
              </tbody>
           </table> 
           <div><h1 class='fs-2' style={{"color":"white"}}>Total Price: {totalPrice}/-</h1></div>(localStorage.setItem("totPrice",{totalPrice}))
           <div><button class='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button></div>
       </div>
     </div>
  
   )
}

export default Cart;