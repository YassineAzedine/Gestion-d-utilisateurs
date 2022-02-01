'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Departement}) {
      // define association here
      // departmentId

      this.belongsTo(Departement , {foreignKey:'departementId', as : 'departement'})
    }
  };
  User.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
    },
    name: {
     type:DataTypes.STRING,
     allowNull:false,
     validate:{
       notNull: {msg:'User must have a name'}, 
       notEmpty: {msg:'Name must not be  embty'}

     }
    } ,
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      notNull: {msg:'User must have a Email'}, 
      notEmpty: {msg:'Email must not be  embty'},
      isEmail:{msg:'Must be a valid email adress'}
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      notNull: {msg:'User must have a password'}, 
      notEmpty: {msg:'Password must not be  embty'}

    }
  }, {
    sequelize,
    tableName: 'users',

    modelName: 'User',
  });
  return User;
};