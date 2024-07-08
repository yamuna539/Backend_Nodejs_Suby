//verify the token in vendorController and add the firm

const Firm = require('../models/Firm');
const multer = require('multer')
const Vendor = require('../models/Vendor');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


app.use(bodyParser.json());



const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, 'uploads/'); //Destination floder where the uploaded images will be stored
    },
    filename: function (req, file, cd){
      cd(null,Date.now() + path.extname( file.originalname)); //Generating a unique filename
    }
});
const upload = multer({ storage: storage});

//this firm is added to the vendorbased on id


const addFirm = async(req, res) =>{
       try{
              const {firmName, area, category, region, offer} = req.body;

    //standard format initial the image

    const image = req.file? req.file.filename: undefined;

    const vendor = await Vendor.findById(req.vendorId)
    if(!vendor){
        res.status(404).json({message: "Vendor not found"})
    }

    //create a instance for the variables

    const firm = new Firm({
        firmName, area, category, region, offer, image, vendor:vendor._id
    })

//save the firm details in database vendor 
   const savedFirm = await firm.save();
   vendor.firm.push(savedFirm)

   await vendor.save()

   return res.status(200).json({message : "Firm added successfully"})  
  
       }
       catch(err){
           console.error(err)
           res.status(500).json("Internal server error")
       }
}

const deleteFirmById = async(req, res) =>{
    try{
       const firmId = req.params.firmId;

       const deletedFirm = await Firm.findByIdAndDelete(firmId);

       if(!deletedFirm){
        return res.status(404).json({error : "No firm found"})
       }
    }
    catch(err){
         console.error(err);
         res.status(500).json({error : "Internal server error"})

    }
}

//export the module with image
module.exports = {addFirm: [upload.single('image'), addFirm], deleteFirmById}