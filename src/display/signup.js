import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'

function Signup(){
  const navigate=useNavigate();
  const [credentials,setCredentials]=useState({name:"",email:"",phoneNo:"",password:"",rePassword:""})

  const handleSubmit=async(e)=>{
     e.preventDefault();
     const response=await fetch("http://localhost:5000/api/createuser",{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({name:credentials.name,email:credentials.email,phoneNo:credentials.phoneNo,password:credentials.password,rePassword:credentials.rePassword,})
     });
     const json=await response.json()
     console.log(json);
     if(!json.success){
       alert("Enter valid credentials")
     }
     else{
        navigate("/login");
        alert("Successfully Submitted")
     }
  }

  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }

  return(
  <div class="bg-success" style={{height:"100vh"}}>
   <div><h1 class="bg-success text-white" style={{"margin-left":"5px"}}>SIGN UP</h1></div>
  <div className='container bg-success' style={{"justify-content":"center","margin":"40px","zIndex":"10"}}>
  <form className='bg-light.bg-gradient' onSubmit={handleSubmit}>
  <div class="mb-3">
    <label htmlFor="name" class="form-label text-white">Name</label>
    <input type="text" class="form-control" name="name" value={credentials.name} onChange={onChange} />
  </div>
  <div class="mb-3">
    <label htmlFor="email" class="form-label text-white">Email address</label>
    <input type="email" class="form-control" name="email" value={credentials.email} onChange={onChange} />
  </div>
  <div class="mb-3">
    <label htmlFor="phoneNo" class="form-label text-white">Phone No</label>
    <input type="text" class="form-control" name="phoneNo" value={credentials.phoneNo} onChange={onChange} />
  </div>
  <div class="mb-3">
    <label htmlFor="password" class="form-label text-white">Password</label>
    <input type="password" class="form-control" name="password" value={credentials.password} onChange={onChange} />
  </div>
  <div class="mb-3">
    <label class="form-label text-white" htmlFor="rePassword">Re-Password</label>
    <input type="password" class="form-control" name="rePassword" value={credentials.rePassword} onChange={onChange} />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  <Link className='m-3 btn btn-danger' to="/login">Already a user</Link>
  </form>
  </div>
  </div>
  )
}


export default Signup;