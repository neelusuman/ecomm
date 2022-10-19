const{Categories}=  require('../models')

async function createCategory(req, res){
const data = req.body;





const name = data.name;
const description = data.description;
try{
    const result = await Categories.create({name, description})
    console.log('result',result);
    res.send({msg: 'Category has been created'})
}
catch(err){
    console.log('err in creation of categories',err)
    res.send(500).send({msg: 'Internal server error'})
}
}

async function getAllCategory(req, res){

    try{
        const result = await Categories.findAll()
        res.send(result)
    }
    catch(err){
        console.log('err in getting categories',err)
        res.send(500).send({msg: 'Internal server error'})
    }


}
async function getCategoryOnId(req, res){
       const categoryId= req.params.id;
    try{
        const result = await Categories.findOne({
            where : {
                id : categoryId
            }
        })
        res.send(result)
    }
    catch(err){
        console.log('err in getting categories based on Id',err)
        res.send(500).send({msg: 'Internal server error'})
    }


}

async function updateCategory(req, res){
    const categoryId= req.params.id;
 try{
     const result = await Categories.findOne({
         where : {
             id : categoryId
         }
     })
     if(result){
        result.name = req.body.name;
        result.description = req.body.description;

        result.save()
        
        res.send({msg: 'category got updated',
    updateCategory: result})
     } else{
        console.log('err in getting categories', err)
			res.status(400).send({msg : 'category id does not exist'})
     }
 }
 catch(err){
     console.log('err in updating categories based on Id',err)
     res.send(500).send({msg: 'Internal server error'})
 }

}
async function deleteCategory(req, res){
    const categoryId= req.params.id;
    try{
        const result= await Categories.destroy({
            where : {
                id : categoryId
            }
        })

    }catch(err){
      console.log('err in deletion of category', err)
      res.status(500).send({msg: 'Internal server Error'})
    }
}

module.exports =  {
    createCategory,
    getAllCategory,
    getCategoryOnId,
    updateCategory,
    deleteCategory
}
