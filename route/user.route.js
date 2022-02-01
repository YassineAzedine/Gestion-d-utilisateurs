module.exports = function(app){
    
    const users = require('../controller/user.controller');
    
    
    app.get('/adduser', users.findAll);
    app.get('/user/delete/:uuid', users.delete);
    app.get('/user/edit/:uuid', users.editForm);
    // app.post('/adduser', users.create);


 
    


}

