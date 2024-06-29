//verify the token 

const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');


const verifyToken = async (req, res, next) =>{
    //req tho patu header kuda server ki velthundhi
    const token = req.headers.token;

    if(!token) {
        return res.status(401).json({error: "Tken is required"})
    }
    try{
        //verify() - gives two parameters (token, secreat key)
       const decoded = jwt.verify(token,"yamuna jyothi")
       //vender model nunchi vendor._id anedhi vasthundhi
       const vendor = await Vendor.findById(decoded.vendorId);

       //if ecode the vendorId if the error are there

       if(!vendor){
        return res.status(404).json({err: "vendor not found"})
       }

       //this vendorId = actual vendor._id

       req.vendorId = vendor._id
       //after successful verification of vendor id we perform next()
       next()

    }catch(err){
     console.error(err)
     return res.status(500).json({err: "Invaild Token"})
    }

    
}

module.exports = verifyToken