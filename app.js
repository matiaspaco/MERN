const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;
//middleware: es la libreria de body parser(se debe instalar) para permitir entender lo que le llega desde el front como json

app.use(bodyParser.json());
app.use(morgan('tiny'));

//Routes crea la vairable yendo a buscar sus propiedades a la ruta y despues los consume usando el app.use accediendo a los metodos get y post
const productsRouter = require('./routers/products');
const ordersRouter = require('./routers/orders');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');

//Routers routea y bindea permitiendo trabajar con los GETS y POSTS de las apis que se encuentran en la carpeta routers
app.use(`${api}/productos`, productsRouter);
app.use(`${api}/ordenes`, ordersRouter);
app.use(`${api}/categorias`, categoriesRouter);
app.use(`${api}/usuarios`, usersRouter);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    dbName : 'eshop-database'
})

.then(()=>{
    console.log('Database connection is ready :P...')
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000, ()=>{
    //console.log(api);
    console.log('server is running http://localhost:3000');
})