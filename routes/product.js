const express = require('express')
const{createProduct,getAllProducts, getProductOnId,filterBasedOnProduct,updateProduct,deleteProduct}=require('../controller/product')
const { validateProductData , verifyToken, isAdmin} = require('../middleware')



const routes = express.Router()

routes.post('/ecomm/api/v1/products',[validateProductData], createProduct)

routes.post('/ecomm/api/v1/products',[verifyToken,isAdmin],createProduct)
routes.get('/ecomm/api/v1/products', getAllProducts)

routes.get('/ecomm/api/v1/products/:id', getProductOnId)
routes.get('/ecomm/api/v1/products/filter', filterBasedOnProduct)


routes.put('/ecomm/api/v1/products/:id',[verifyToken,isAdmin],updateProduct)

routes.delete('/ecomm/api/v1/products/:id',[verifyToken,isAdmin], deleteProduct)
module.exports =  {  productRoutes: routes}
