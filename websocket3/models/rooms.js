'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    state: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {});
  rooms.associate = function(models) {
    // associations can be defined here
  };
  return rooms;
};