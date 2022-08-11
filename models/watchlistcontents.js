const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class WatchListContents extends Model { }
WatchListContents.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tag_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
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
  modelName: 'WatchListContents',
});


module.exports = WatchListContents;
