const Users = require('./users');
const Tags = require('./tags');
const WatchListContents = require('./watchlistcontents');

Users.hasMany(WatchListContents, {
    foreignKey: 'user_id',
  });

  Tags.hasMany(WatchListContents, {
    foreignKey: 'tag_id',
  });

  WatchListContents.belongsTo(Users, {
    foreignKey: 'user_id',
  });

  WatchListContents.belongsTo(Tags, {
    foreignKey: 'tag_id',
  });

  module.exports = { Users, Tags, WatchListContents }