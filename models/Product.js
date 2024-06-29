const mongoose = require('mongoose')

const productScheme = new mongoose.Schema({
    productName : {
        type: String,
        require: true
    },
    price:{
        type: String,
        require: true
    },
    catogory: {
        typr : [
            {
                type : String,
                enmu :['veg','non-veg'] 
            }
        ]
    },
    image : {
        type: String
    },
    bestseller : {
        type: String
    },
    description: {
        type: String
    },
    //relation with firm
    firm :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Firm'
        }
    ]
    
});

const product = mongoose.model('product', productScheme);

module.exports = product;

