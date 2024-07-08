const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

//this is in-build module in nodejs
const path = require('path')


const app = express();

const PORT = process.env.PORT || 5000;

dotEnv.config();
app.use(cors())

// app.get('/' , (req, res) => {
//     res.send("hello world")
// })

//connect the mongodb

mongoose.connect("mongodb+srv://yamuna:yamuna123@cluster0.ccheofh.mongodb.net/swiggy?retryWrites=true&w=majority&appName=Cluster0").then(
    () => console.log("database is connecting.....") 
)

app.use(bodyParser.json());
//middleware for http request (path,)
app.use('/vendor', vendorRoutes);
//path for firm
app.use('/firm',firmRoutes);
//middleware for products
app.use('/product', productRoutes);
//middleware for image standard
app.use('/uploads', express.static('uploads'))



app.listen(PORT, () =>{
     console.log(`server is running...... at ${PORT}`);
})
app.use('/', (req, res)=>{
    res.send("<h1>Welcome to swiggy</h1>")
})