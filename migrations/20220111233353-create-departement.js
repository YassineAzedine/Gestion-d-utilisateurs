'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Departements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
       uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
    },
      name: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        allowNull:false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Departements');
  }
};