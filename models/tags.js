const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Tags extends Model { }
Tags.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true,
      },
     
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      }
},
{
  sequelize,
  timestamps : false,
  underscored: true,
  freezeTableName: true,
  modelName: 'Tags',
});

module.exports = Tags;

