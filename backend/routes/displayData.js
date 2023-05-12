const express=require('express')
const router=express.Router()

router.post('/bookData',(req,res)=>{
  try{
     res.send([global.Book_Items, global.Book_Category])
  }catch(error){
    console.error(error.message);
    res.send("Server Error")
  }
})

module.exports=router;