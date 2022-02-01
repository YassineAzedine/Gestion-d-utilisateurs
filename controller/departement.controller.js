  
  const { sequelize, Departement, User } = require('../models')
  exports.findAll = async (req, res) => {
    try {
        const departements = await Departement.findAll()
        return res.render('home', { departements: departements });
        return res.json(departements)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Somthing went wrong' })
    }
};
exports.findOne =  async (req, res) => {
    const uuid = req.params.uuid
    try {
        const departement = await Departement.findOne({
            where: { uuid },
            include: 'users'
        })
        console.log("🚀 ~ file: app.js ~ line 53 ~ app.get ~ departement", departement)
        return res.render('users', { departement: departement })
        return res.json(departement)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Somthing went wrong' })
    }
};
exports.formDepartement =  (req, res) => {
    res.render('add')
};
exports.delete = async (req, res) => {
    const uuid = req.params.uuid
    try {
        const departement = await Departement.findOne({
            where: { uuid },
            
        })
        
        await departement.destroy()
        return res.redirect('/')
        
        return res.json({ massage: 'Departement Deleted' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Somthing went wrong' })
    }
    
}

exports.editForm =  async (req, res) => {
    const uuid = req.params.uuid
    
    try {
        const departement = await Departement.findOne({
            where: { uuid },
            
        })
        
        
        return res.render('update', { departement })
        
        
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Somthing went wrong' })
    }
    
    
}
exports.update = async (req, res) => {
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
}
// exports.create =  async (req, res) => {
//     const { name, description } = req.body
//     try {
//         const departemnt = await Departement.create({
//             name, description,

//         })
//         return res.redirect('/')
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// };



