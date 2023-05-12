import React,{useState} from 'react';
import {useCart,useDispatchCart} from './ContextReducer'

function Item(props) {
let dispatch=useDispatchCart();
let data=useCart();
const [qty,setQty]=useState(1)
const handleCart=async()=>{
  let book=[];
  for(const item of data){
    if(item.id===props.id)
    { 
      book=item;
      break;
    }
  }
/* 
 if(book!==[])
  {
    if(book.size===size)
    {
      await dispatch({type:"UPDATE",id:props.id,price:props.price,qty:qty})
      return
    }
  }*/
  await dispatch({type:"ADD",id:props.id,name:props.bookName,price:props.price*qty,qty:qty})
  console.log(data);
}

  return (
   <div style={{"padding-right":"50px"}}>
    <div class="card mt-3" style={{"width": "18rem","border-radius":"10px","margin-left":"5px"}}>
     <img src={props.img} class="card-img-top" alt="Harrypotter" style={{"height":"250px"}}/>
     <div class="card-body">
  	  <h5 class="card-title">{props.bookName}</h5>
          <h6 class="card-title">Author:{props.author}</h6>
  	  <p class="card-text">{props.description}</p>
  	  <div class="container w-100">
             <select class="m-2 h-100 bg-success" style={{"color":"white"}} onChange={(e)=>setQty(e.target.value)}>
               {Array.from(Array(8),(e,i)=>{
                       return(
                        <option key={i+1} value={i+1}>{i+1}</option>
                       )
                })}
             </select>
             <div class="d-inline h-100 fs-5">
               Price {props.price*qty*85}/-
             </div>
          </div>
          <hr> 
          </hr>
          <button class={'btn btn-success justify-center ms-2'} onClick={handleCart}>Add to the cart</button><h6>Rating:  {props.reviews}</h6>
     </div>
    </div>
   </div>
  );
}

export default Item;
