const Product = require('../models/Product');
const Firm = require('../models/Firm');
const multer = require('multer');
const path = require('path');

//add image

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, 'uploads/'); //Destination floder where the uploaded images will be stored
    },
    filename: function (req, file, cd){
      cd(null,Date.now() + path.extname( file.originalname)); //Generating a unique filename
    }
});
const upload = multer({ storage: storage});

//add product we want one function
const addProduct =  async(req, res) =>{
    try{
        const {productName, price, category, bestseller, description} = req.body;
        //for image property
        const image = req.file? req.file.filename: undefined;

        //based on firm_id we add the products
        //individually created firm id
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm){
            res.status(404).json({error : "No Firm found"});
        }

        //take one instance and we add the properties
        const product = new Product({
            productName, 
            price,
             category,
              bestseller,
               description,
               image,
               firm: firm._id
        })

        const savesProduct = await product.save();

        firm.product.push(savesProduct);

        await firm.save()

        res.status(200).json(savesProduct)
    }
    catch(error){
        console.error(error);
        res.status(500).json({error : "Internal Server Error"})
    }
}

const getProductByFirm = async(req, res) =>{
    try{
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error : "No firm found"});
        }
     //get firm name
       const restaurantName = firm.firmName;

        const products = await Product.find({firm : firmId});

        res.status(200).json({restaurantName,products});
    }
    catch(err){
       console.error(err);
       res.status(500).json({error: "Internal Server Error"})
    }
}

const deleteProductById = async(req, res) =>{
    try{
       const productId = req.params.productId;

       const deletedProduct = await Product.findByIdAndDelete(productId);

       if(!deletedProduct){
        return res.status(404).json({error : "No product found"})
       }
    }
    catch(err){
         console.error(err);
         res.status(500).json({error : "Internal server error"})

    }
}

module.exports = {addProduct: [upload.single('image'), addProduct], getProductByFirm,deleteProductById};