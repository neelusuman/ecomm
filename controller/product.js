const {Products}= require('../models')

async function createProduct(req,res){
    const productData = req.body;
    
    try{
       const name = productData.name;
       const description =productData.description;
       const cost = productData.cost;
       const CategoryId = productData.CategoryId;
       const result = await Products.create({name,description,cost,CategoryId});
       res.send({msg:'Product got created',result})
    }
    catch(err){
        res.status(500).send({msg: 'Internal server error'})
    }
}

async function getAllProducts(req, res){
 try{
    const result = await Products.findAll();
    res.send(result)
 }
 catch(err){
    res.status(500).send({msg: 'Internal server error'})
 }
}
async function getProductOnId(req, res){
    const productId= req.params.id;
    try{
       const result = await Products.findOne({
        where :{
            id: productId
        }
       });
       res.send(result)
    }
    catch(err){
        console.log('err',err)
       res.status(500).send({msg: 'Internal server error'})
    }
   }
   async function updateProduct(req, res){

    const productData= req.body;
    const productId= req.params.id;
    
    

    try{
        const name = productData.name;
        const description =productData.description;
        const cost = productData.cost;
       const product = await Products.findOne({
        where :{
            id : productId
        }
       })
       if(product){
        product.name = name;
        product.cost = cost;
        product.description = description;
        product.quantity = quantity;

        product.save()

        res.send({msg : 'product got updated successfully'})
    }else{
        res.status(400).send({msg : 'product id does not exist'})
    }


       
    }
    catch(err){
       res.status(500).send({msg: 'Internal server error'})
    }
   }

   async function deleteProduct(req,res){
	const productId = req.params.id;
	try{
		await Products.destroy({
			where: {id:productId}
		})

		res.send({msg: "product delete successfully"})
	}catch(err){
		res.status(500).send({msg: 'Internal server error',err})
	}
}

async function filterBasedOnProduct(req,res){
    const CategoryId= req.query.CategoryId;
    const name = req.query.name;
    const minCost = req.query.minCost;
    const maxCost = req.query.maxCost;
    if(CategoryId){
        const result= await Products.findAll(
            {
                where: {
                    CategoryId : CategoryId
                }
            } )
            res.send(result);
    }
    if (name){
        const result= await Products.findAll({
            where : {
                name : name
            }
        })
        res.send(result);
    }
    if(minCost && maxCost){
        const result= await Products.findAll({
            where : {
                cost :{
                   [Sequelize.Op.gte] : minCost,
                   [Sequelize.Op.lte]: maxCost
                }
            }
        })
        res.send(result)
    }
    else if (minCost){
        const result = await Products.findAll({
            where: {
                cost :{
                    [Sequelize.Op.gte] : minCost
                }
            }
        })
        res.send(result)
    }
    else if (maxCost){
        const result = await Products.findAll({
            where: {
                cost :{
                    [Sequelize.Op.lte] : maxCost
                }
            }
        })
        res.send(result)
    }
    else{
        const result= await Products.findAll()
        res.send(result);
    }

}

module.exports = {
	createProduct,
	getAllProducts,
	getProductOnId,
	deleteProduct,
	updateProduct,
    filterBasedOnProduct
} 
   

