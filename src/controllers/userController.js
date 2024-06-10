const userModel=require("../models/users");
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY="NOTESAPI"

const signup = async (req, res) =>{
    //Existing user check
    //hash passsword generate
    //user creation 
    //token generate


    const {username, email, password}=req.body;
    try{    
        const existingUser=await userModel.findOne({email:email})
        if(existingUser){
            return res.status(400).json("User Already exist!")
        }
        
        const hashedPassword= await bcrypt.hash(password,10);

        const result = await userModel.create({
            email:email, 
            password:hashedPassword,
            username:username
        });

        const token= jwt.sign({
            email:result.email,
            id:result._id
        }, SECRET_KEY)

        res.status(201).json({user:result,token:token})

    }catch(error){
        console.log(error)
        res.status(500).json({message:"Something went wrong"});
    }
}

const signin= async (req, res) =>{
    //for sign in
    //1. check whether user is existing or not
    //2. if yes then sign in and if not then error

    const {email, password}=req.body
    try{

        const existingUser=await userModel.findOne({email:email})
        if(!existingUser){
            return res.status(404).json("User not found!")
        }

        const matchPassword=await bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
            return res.status(400).json("Invalid Credentials");
        }

        const token= jwt.sign({
            email:existingUser.email,
            id:existingUser._id
        }, SECRET_KEY)  
        res.status(200).json({user:existingUser,token:token})

    }catch(error){
        console.log(error)
        res.status(500).json({message:"Something went wrong"});
    }   
}

module.exports={signup, signin};
