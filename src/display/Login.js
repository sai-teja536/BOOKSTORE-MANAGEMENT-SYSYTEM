import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom'

function Login() {
  const [credentials,setCredentials]=useState({email:"",password:""})
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
     e.preventDefault();
     const response=await fetch("http://localhost:5000/api/loginuser",{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
     });
     let strName="";
     for(let i=0;i<credentials.email.length;i++)
     {
       if(credentials.email.charAt(i)==='@')
       {
         break;
       }
       strName+=credentials.email.charAt(i);
     }
     localStorage.setItem("userName",strName);
     const json=await response.json()
     console.log(json);
     if(!json.success){
       alert("Enter valid credentials")
     }
     if(json.success){
       localStorage.setItem("userEmail",credentials.email);
       localStorage.setItem("authToken",json.authToken);
       console.log(localStorage.getItem("authToken"));
       navigate("/");
     }
     
  }

  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }

  return(
  <div class="bg-success" style={{height:"100vh"}}>
   <div><h1 class="text-white" style={{"margin-left":"5px"}}>LOGIN</h1></div>
  <div className='container' style={{"justify-content":"center","margin":"40px","zIndex":"10"}}>
  <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label htmlFor="email" class="form-label text-white">Email address</label>
    <input type="email" class="form-control" name="email" value={credentials.email} onChange={onChange} />
  </div>
  <div class="mb-3">
    <label htmlFor="password" class="form-label text-white">Password</label>
    <input type="password" class="form-control" name="password" value={credentials.password} onChange={onChange} />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  <Link className='m-3 btn btn-danger' to="/createuser">New user?</Link>
  </form>
  </div>
  <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgKtmNqAzwzc7FfGP2yBA_wJTtPjHYY97DgGsEE4KK7g&usqp=CAU&ec=48665698" style={{width:"120vw",height:"50vh","margin-left":"-0px"}}></img></div>
  </div>
  )
}

export default Login;
