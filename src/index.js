const express = require("express");
const app=express()
const dotenv= require("dotenv")
dotenv.config();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const cors=require("cors");


const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

app.use("/users", userRouter)
app.use("/note",noteRouter)


app.get("/",(req,res) => {
    res.send("Notes api from manish!")
});

const PORT= process.env.PORT || 5000;

mongoose.connect("mongodb+srv://admin:admin@testdb.7nnosv3.mongodb.net/test?retryWrites=true&w=majority&appName=TestDB")
.then(()=>{  
    console.log("Connected Successfully");
    app.listen(PORT,()=>{
        console.log("Server started on port no "+PORT)
    });
})
.catch((error)=>{
    console.log(error);
})
