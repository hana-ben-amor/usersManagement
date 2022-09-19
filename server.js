const express=require("express")
const mongoose = require('mongoose');
const dotenv=require('dotenv').config({ path:'./config/.env' });
const user = require("./models/User")
const app=express();
app.use(express.json())
mongoose.connect(process.env.MONGODB_URI,{
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Mongodb connected....');
  })
  .catch(err => console.log(err.message));

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db...');
});

mongoose.connection.on('error', err => {
  console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected...');
});


//add new user to the data base Users
app.post("/newUser",(req,res)=>{
    let newUser = new user(req.body)
    newUser.save((err,data)=>{
        if(err) throw err
        else res.send(data)
    })
})
//get all the users 
app.get("/getUsers",(req,res)=>{
    user.find(
        (err,data)=>{
        if (err) throw err
        else res.json(data)
    })
})
//Edit a user by id
app.put("/update/:id",(req,res)=>{
    user.findByIdAndUpdate({_id:req.params.id},{...req.body},(err,data)=>{
        if (err) throw err
        else res.json(req.body)
    })
})
//delete user by id
app.delete("/delete/:id",(req,res)=>{
    user.findByIdAndDelete({_id:req.params.id},(err,data)=>{
        if(err) throw err 
        else res.json({msg:"deleted"})
    })
})




const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
