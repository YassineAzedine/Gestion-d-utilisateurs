  
  const { sequelize, Departement, User } = require('../models')
  exports.findAll = async (req, res) => {
    try {
        const departements = await Departement.findAll()

        return res.render('adduser', { departements: departements });
        // return res.json(departements)
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
exports.delete =  async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: { uuid },
            
        })
        
        await user.destroy()
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
        const departements = await Departement.findAll()
        const user = await User.findOne({
            where: { uuid },
            
        })
        console.log("🚀 ~ file: app.js ~ line 147 ~ app.get ~ user", user)

        
        
        return res.render('updateuser', { user, departements })
        
        
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Somthing went wrong' })
    }
    
    
}
// exports.create = async (req, res) => {
//     const { departemntUuid, name, email, password } = req.body
//     try {
//         const departement = await Departement.findOne({ where: { uuid: departemntUuid } })
//         const user = await User.create({ name, email, password, departementId: departement.id })
//         return res.redirect('/')
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }

// }
