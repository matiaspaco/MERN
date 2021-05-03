const {User} = require('../models/user');
const express = require('express')
const router = express.Router();

router.get(`/`, async (req, res)=>{ //se debe usar un metodo asincronicp para que espere la busqueda antes de enviar el parametro

    const userList = await User.find();

    if(!userList){
        res.status(500).json({success: false})
    }
    res.send(userList);
})

module.exports = router;