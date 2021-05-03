const {Category} = require('../models/category');
const express = require('express')
const router = express.Router();

router.get(`/`, async (req, res)=>{ //se debe usar un metodo asincronicp para que espere la busqueda antes de enviar el parametro

    const categoryList = await Category.find();

    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList);
})

router.get('/:id', async(req, res)=>{
    const categoria = await Category.findById(req.params.id);
    if(!categoria){
        res.status(500).json({success: false})
    }
    res.status(200).send(categoria);
})

router.post('/', async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

    category = await category.save();
    if (!category) {
        return res.status(404).send('la categoria no puede ser creada :/ revisa bien el codigo salamin!!')
    }
    res.send(category);
})

router.put('/:id', async (req, res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        { new: true}//Esta linea es agregada para que desde postman se vea el registro actualizado caso contrario actualiza pero muestra el regsitro antiguo
    )

    if (!category) {
        return res.status(404).send('la categoria no puede ser creada :/ revisa bien el codigo salamin!!')
    }
    res.send(category);
})

router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if (category) {
            return res.status(200).json({success: true, message: 'la categoria se elimino correctamente'})
        }else{
            return res.status(404).json({success: false, message:"categoria no encontrada"})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})

module.exports = router;