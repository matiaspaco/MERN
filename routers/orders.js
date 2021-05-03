const {Order} = require('../models/order');
const express = require('express')
const router = express.Router();

router.get(`/`, async (req, res)=>{ //se debe usar un metodo asincronicp para que espere la busqueda antes de enviar el parametro

    const orderList = await Order.find();

    if(!orderList){
        res.status(500).json({success: false})
    }
    res.send(orderList);
})

module.exports = router;