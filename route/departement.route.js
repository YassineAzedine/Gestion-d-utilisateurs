module.exports = function(app){
    
    const departements = require('../controller/departement.controller');
    
    
    app.get('/', departements.findAll);
    app.get('/departements/:uuid', departements.findOne);
    app.get('/add', departements.formDepartement);
    app.get('/delete/:uuid', departements.delete);
    app.get('/edit/:uuid', departements.editForm);
    // app.post('/add', departements.create);



    

    


}

