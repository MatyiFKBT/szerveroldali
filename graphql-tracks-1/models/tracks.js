'use strict';
module.exports = (sequelize, DataTypes) => {
  const tracks = sequelize.define('tracks', {
    name: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});
  tracks.associate = function(models) {
    // associations can be defined here
    tracks.belongsTo(models.projects)
  };
  return tracks;
};