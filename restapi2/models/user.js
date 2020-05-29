'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.track) //User.setTracks([]), User.getTracks(), User.addTrack(), User.removeTrack()
  };
  return User;
};