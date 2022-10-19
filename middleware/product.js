const {Categories}= require('../models')

async function validateProductData(req,res,next){
    const productData= req.body;

    if(!productData){
        res.status(400).send({msg: 'name is missing in product data'})
        return;
    }
    if(productData.CategoryId){
        const result = await Categories.findByPk(productData.CategoryId);
        if(result){
            next()
        }else{
            res.status(400).send({msg: 'CategoryId does not exist in category table'})
            return;
        }
    }else{
        res.status(400).send({msg: 'CategoryId does not exist in product data'})
        return;
    }
}
module.exports ={
    validateProductData
}