
const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
    firmName : {
        type: String,
        require : true,
        unique:true
    },
    area : {
        type: String,
        require : true
    },
    category:{
        type : [
            {
                type : String,
                enmu :['veg','non-veg']  //store multiple values
            }
        ]
    },
    region:{
        type: [{
            type : String,
            enum : ["south-india","north-india","chinese","bakery"]
        }]
    },
    offer : {
        type : String,
    },
    image : {
        type : String
    },
    //it forms the relation to other --vendor ane table tho ee firm ane table relate avuthundhi
    vendor : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Vendor'
        }
    ],
    product : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    ]
})

//add this relation in vendor model

//export this model

const firm  = mongoose.model('Firm' , firmSchema);

module.exports = firm