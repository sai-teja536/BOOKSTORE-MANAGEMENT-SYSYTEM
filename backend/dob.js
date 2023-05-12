const mongoose=require('mongoose');

const database=()=>{
   const connectionParams={
     useNewUrlParser:true,
     useUnifiedTopology:true,
   };
   try{
    mongoose.connect('mongodb+srv://saiteja:lxMahKTaQBR2Apff@cluster0.r7kvsfv.mongodb.net/BookInfo?retryWrites=true&w=majority').then(() => {
    console.log('Connected to MongoDB Atlas');
    const MyModel = mongoose.model('MyModel', new mongoose.Schema({}), 'Book_Items');
    MyModel.find({})
      .then(data => {
        const BookCategory=mongoose.model('BookCategory', new mongoose.Schema({}), 'Book_Category');
        BookCategory.find({}).then(catData=>{
         global.Book_Items=data;
         global.Book_Category=catData;
         console.log([global.Book_Items, global.Book_Category]);
        })      
      })
      .catch(error => {
        console.error(error);
        
      });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
    console.log("Connected Succesfully ra sai");
   }
   catch(error){
     console.log(error);
     console.log("connection failed");
   }
};

module.exports=database;