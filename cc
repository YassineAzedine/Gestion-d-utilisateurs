const express = require('express')

const bodyParser = require('body-parser');
const{sequelize , Departement,User} = require('./models')
const app = express()
app.use(express.json())
//EJS
app.set('views','./views')
app.set('view engine', 'ejs')

//
app.use(bodyParser.urlencoded({ extended: false }));
//
app.use(bodyParser.json());
//

app.get('/add' , (req,res)=>{
    res.render('add')
});
app.post('/add', async (req,res)=>{
    const{ name , description} = req.body
    try{
    const user = await  Departement.create({
            name,description,
           
        })
        return res.redirect('/')
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})


app.get('/' , async (req,res ) =>{
    try {
        const departements = await Departement.findAll()
      
        return res.render('home', {departements:departements});
        // return res.json(departements)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'Somthing went wrong'})
    }
})
app.get('/departements/:uuid' , async (req,res ) =>{
    const uuid = req.params.uuid
    try {
        const departement = await Departement.findOne({
            where:{uuid},
            include:'users'
        })
        console.log("🚀 ~ file: app.js ~ line 53 ~ app.get ~ departement", departement)
        // return res.json(departement)
        return res.render('users' , {departement:departement} )
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'Somthing went wrong'})
    }
})
//

app.get('/adduser' ,async (req,res)=>{
    try {
        const departements = await Departement.findAll()
      
        return res.render('adduser', {departements:departements});
        // return res.json(departements)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'Somthing went wrong'})
    }
});

app.post('/adduser',async(req,res)=>{
    const{departemntUuid,name,email,password} = req.body
    try{
        const departement = await Departement.findOne({where:{uuid:departemntUuid}})
        const user = await User.create({name,email,password,departementId:departement.id})
        return res.redirect('/')
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }

})
// app.get('/users',async(req,res)=>{
//     try{
//   const users = await User.findAll({include:['departement']})
       
      
//         return res.render('users',{users:users})
//     }catch(err){
//         console.log(err)
//         return res.status(500).json(err)
//     }

// })
//
app.get('/delete/:uuid' , async (req,res ) =>{
    const uuid = req.params.uuid
    try {
        const departement = await Departement.findOne({
            where:{uuid},
           
        })
        
        await departement.destroy()
        return res.redirect('/')
      
        return res.json({massage : 'Departement Deleted'})
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'Somthing went wrong'})
    }

})
//
app.get('/user/delete/:uuid' , async (req,res ) =>{
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where:{uuid},
           
        })
        
        await user.destroy()
        return res.redirect('/')
      
        return res.json({massage : 'Departement Deleted'})
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'Somthing went wrong'})
    }

})

app.get('/user/edit/:uuid',async (req,res)=>{
    const uuid = req.params.uuid
    
    try {
        const departements = await Departement.findAll()
        const user = await User.findOne({
            where:{uuid},
           
        })
        console.log("🚀 ~ file: app.js ~ line 147 ~ app.get ~ user", user)
        
        

        return res.render('updateuser',{user  , departements} )
        
          
       
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'Somthing went wrong'})
    }


})
app.post('/user/update/:uuid' , async (req,res ) =>{
    const uuid = req.params.uuid
    const {name,email,password} = req.body
    try {
        const user = await User.findOne({
            where:{uuid},
           
        })
      
        user.name = name
        user.email = email
        user.password = password
      
      


        await user.save()
        return res.redirect('/')
       
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'Somthing went wrong'})
    }
})


app.get('/edit/:uuid',async (req,res)=>{
    const uuid = req.params.uuid
    
    try {
        const departement = await Departement.findOne({
            where:{uuid},
           
        })
        
        
        return res.render('update',{departement} )
        
          
       
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'Somthing went wrong'})
    }


})

app.post('/update/:uuid' , async (req,res ) =>{
    const uuid = req.params.uuid
    const {name,description} = req.body
    try {
        const departement = await Departement.findOne({
            where:{uuid},
           
        })
      
        departement.name = name
        departement.description = description
        await departement.save()
        return res.redirect('/')
       
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'Somthing went wrong'})
    }
})
app.listen({port:5000} , async ()=>{
console.log('Server up on http://localohost:5000')
    await sequelize.sync({alter:true})
    console.log('Database synced')
})
