const Vendor =require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const dotEnv = require('dotenv');

// dotEnv.config();

// //accessthe env file value here

// const secretKey = process.env.WhatIsYourName

 const venderRegister = async (req, res) =>{
    const {username, email, password} = req.body;
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            //for bad request
            return res.status(400).json("Email already taken")
        }
        //for password hash , here 10 is rounds
        const hashedPassword = await bcrypt.hash(password, 10)

        //here the data in the body is saved in the database create an instance(object) the we access the data
        const newVender = new Vendor({
            username,
            email,
            password:hashedPassword
        })
        await newVender.save()
        //200 - 300 is success message
        res.status(201).json({message: "vendor registered successful"});
        console.log("registerd")
    }
    
    catch(err){
        //actual error
        console.log(err);
         res.status(500).json({err: "Internal Server Error"})
    }
 }



const vendorLogin = async(req, res) =>{
    const {email, password} = req.body;
    try{
         const vendor = await Vendor.findOne({email});
         if(!vendor || !(await bcrypt.compare(password, vendor.password))){
            return res.status(401).json({error : "Invaild username or password" })
         } 
         //parameter of jwt package - It generate the tokens
         //1.vendor._id
         //2.secrate key is also a parameter of the jwt
         //3. it is a optional i.e ExprieTime
        const token = jwt.sign({vendorId : vendor._id },"yamuna jyothi",{expiresIn: "3h" })

         res.status(200).json({success: "Login successful", token})
         console.log(email, "This is token", token);
    }
    catch(err){
      console.log(err);
      //internal server error
      res.status(500).json({err : "Internal server errr"});
    }
}


//---------- get all records from firm table in vendor table

const getAllVendors = async(req, res) =>{
    try{
        //a table numchi mana vendor table lo chupinchali anukunte populate() method use cheyali
        const vendor = await Vendor.find().populate('firm');
        res.json({vendor})
    }
    catch(err){
       console.error(err);
       res.status(500).json({message: "Internal Error"});
    }

}
//get vendor details individually

const getVendorById = async(req,res) =>{
    //the id get the url 
    const vendorId = req.params.id;
    try{
      const vendor =await Vendor.findById(vendorId).populate('firm');
      if(!vendor){
        return res.status(404).json({err: "Vendor not found"})
      }
      res.status(200).json({vendor})
    }
    catch(err){
       console.error(err);
       res.status(500).json({message : "Internal error"});
    }

}

module.exports = {venderRegister, vendorLogin, getAllVendors, getVendorById}