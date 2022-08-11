const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Users extends Model { }
Users.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    
},
{
  sequelize,
  timestamps : false,
  underscored: true,
  freezeTableName: true,
  modelName: 'Users',
});

module.exports = Users;