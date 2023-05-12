const express = require('express')
const app = express()
const port = 5000
const database=require("./dob")
const bodyParser=require("body-parser");
const stripe=require("stripe")("sk_test_51N6bpESFc5hmqjNJ7xvxJ5Xl16qLKSOI0PGyUFAdghzKiJocmdh1PCQQRXSlYca6v1YVV4lNxBXlRGauaKBfitjq00qsQvSH7U");
const uuid=require('uuid').v4
const cors = require('cors')

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})


database();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors());

app.post('/payment',(req,res)=>{
   console.log("request"+req.body)
   let error,status;
  try{
	const{product,token}=req.body
        const customer =stripe.customers.create({
         email:token.email,
         source:token.id
        });
       const idempotency_key=uuid();
       const charge=stripe.charges.create({
	   amount:product.price*100,
		currency:"usd",
           customer:customer.id,
           receipt_email:token.email,
           description:`purchased the ${product.name}`,
           shipping:{
            name:token.card.name,
            address:{
            line1:token.card.address_line1,
            line2:token.card.address_line2,
            city:token.card.address_city,
            country:token.card.address_country,
            postal_code:token.card.address_zip,
            },
           },
       },
       { idempotency_key,}
     );

     console.log("charge",{charge});
     status="success";
  }catch(error)
  {
   console.log(error)
   status="failure";
  }
  res.json({error,status});
})

app.use('/api',require("./routes/createUser"));
app.use('/api',require("./routes/displayData"));
app.use('/api',require("./routes/myOrderData"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

