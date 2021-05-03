const {Product} = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res)=>{

    const productList = await Product.find().populate('category');
    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList);
})


router.get(`/:id`, async (req, res)=>{

    const product = await Product.findById(req.params.id).populate('category');
    if(!product){
        res.status(500).json({success: false})
    }
    res.send(product);
})

router.post(`/`, async (req, res)=>{

     const categorias = await Category.findById(req.body.category);

     if (!categorias) return res.status(400).send('Categoria invalida')

     let product = new Product({
         name: req.body.name,
         description: req.body.description,
         richDescription: req.body.richDescription,
         image: req.body.image,
         brand: req.body.brand,
         price: req.body.price,
         category: req.body.category,
         countInStock: req.body.countInStock,
         rating: req.body.rating,
         numReviews: req.body.numReviews,
         isFeatured: req.body.isFeatured,
     })

     product = await product.save();

     if (!product) 
     return res.status(500).send('El producto no se pudo crear')
     res.send(product);

})

router.put('/:id', async (req, res)=>{

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Producto invalido ID')
    }

    const categorias = await Category.findById(req.body.category);

    if (!categorias) return res.status(400).send('Categoria invalida')

    const producto = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true}
    )

    if (!producto) return res.status(404).send('El producto no puede ser actualizado :/ revisa bien el codigo salamin!!')
    res.send(producto);
})

router.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(producto =>{
        if (producto) {
            return res.status(200).json({success: true, message: 'el producto se eliminó correctamente'})
        }else{
            return res.status(404).json({success: false, message:"Producto no encontrado"})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})

router.get('/get/count', async (req, res) => {
    const ContadorProductos = await Product.countDocuments((count) => count)// el primer count es un callback es como una declaracion de una variable que se usa para contar( o sea se le pasa un parametro vacio jeje) y despues con la funcion => pide que se la devuelva en la variable 'count' podia poner otro nombre a la variable y devolvia tambien lo que se conto en el primer count asignada a esta nueva variable pero casi siempre se nombra igual
    if (!ContadorProductos) {
        res.status(500).json({success: false})
    }
    res.send({
        ContadorProductos: ContadorProductos // Este res se emplea para poder devolver un JSON
    })
})

router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count : 0 // indica que si llega a contar el <req.params.count> algo (es decir devuelve true) que devuelva el valor sino (los dos puntos) que devuelva el valor 0
    const products = await Product.find({isFeatured: true}).limit(+count);//El + delante de la variable sirve para convertir el string de la constante en int
    if (!products) {
        res.status(500).json({success: false})
    }
    res.send({products});
})

module.exports = router;