'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('track', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#ffffff',
      allowNull: false,
    }
  }, {});
  Track.associate = function(models) {
    // associations can be defined here
    Track.belongsTo(models.user) // Track.setUser, Track.getUser
  };
  return Track;
};