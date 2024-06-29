

const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');

//assign the express router method in some variable
const router = express.Router()

//create the router -end points,middleware,function
router.post('/add-firm', verifyToken, firmController.addFirm);

router.get('/uploads/:imageName', (req, res) =>{
    //to get the imageName from the database
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname, '..' , 'uploads',imageName))
});

router.delete('/:firmId', firmController.deleteFirmById);

module.exports = router;  