const express = require('express')
const flash = require('express-flash')

const bodyParser = require('body-parser');
const { sequelize, Departement, User } = require('./models')
const app = express()
app.use(express.json())

//EJS
app.set('views', './views')
app.set('view engine', 'ejs')

//
app.use(bodyParser.urlencoded({ extended: false }));
//
app.use(bodyParser.json());

//controller
require('./route/departement.route')(app);
require('./route/user.route')(app);



//add and update

app.post('/add', async (req, res) => {
    const { name, description } = req.body
    try {
        const user = await Departement.create({
            name, description,

        })
 
        return res.redirect('/')
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})
app.post('/update/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { name, description } = req.body
    try {
        const departement = await Departement.findOne({
            where: { uuid },

        })

        departement.name = name
        departement.description = description
        await departement.save()
        return res.redirect('/')

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Somthing went wrong' })
    }
})
app.post('/adduser', async (req, res) => {
    const { departemntUuid, name, email, password } = req.body
    try {
        const departement = await Departement.findOne({ where: { uuid: departemntUuid } })
        const user = await User.create({ name, email, password, departementId: departement.id })
        return res.redirect('/')
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
    
})

app.post('/user/update/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { name, email, password } = req.body
    try {
        const user = await User.findOne({
            where: { uuid },

        })

        user.name = name
        user.email = email
        user.password = password




        await user.save()
        return res.redirect('/')

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Somthing went wrong' })
    }
})













//users




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

//







app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localohost:5000')
    await sequelize.sync({ alter: true })
    console.log('Database synced')
})