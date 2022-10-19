const {serverPort} = require('./config/server.config')
const express = require('express')

const {Categories, sequelize,Products,Role}= require('./models')
const {categoryRoutes,productRoutes,authRoutes, cartRoutes}= require('./routes')




const app = express()
app.use(express.json())

app.use(authRoutes)
app.use(cartRoutes)
app.use(categoryRoutes)

app.use(productRoutes)


app.listen(serverPort, async()=> {
	console.log('server is running on this port', serverPort)
	//await Categories.sync({force: true})   //for syncing with db
	await init() //for creating some dafault data
	
})

 async function init(){
	try{
 	await sequelize.sync({force: true})

	const defaultCategories =[
 		{
 		name: 'Mobile',
 		description: 'About Mobile'
 	},
{
 	name: 'Washing Machine',
 	description: 'About Washing Machine'
 }
]
const defaultproducts =[
	{
		"name" : "makeup kit",
		"cost" : 700,
		"description" : "Nyka best product",
		"CategoryId" :1
	},
	{
		"name" : "Fogg",
		"cost" : 500,
		"description" : "best fragnance",
		"CategoryId" :2
	},
	{
		"name" : "Summer Clothes",
		"cost" : 280,
		"description" : "Best for summer holidays",
		"CategoryId" :2
	}
]

const defaultRoles =[
	{
		name: 'User'
	},
	{
		name: 'Admin'
	}
]
  await Categories.bulkCreate(defaultCategories);

await Products.bulkCreate(defaultproducts)
await Role.bulkCreate(defaultRoles)
	}
	catch(err){
		console.log(err)
	}
 }

 
 