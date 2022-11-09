'use strict';

module.exports = (sequelize) => {
  const { user, category, record } = sequelize.models;

  user.hasOne(record, {
    foreignKey: {
      allowNull: false,
    },
  });
  record.belongsTo(user);

  user.hasMany(category);
  category.belongsTo(user);

  category.hasOne(record, {
    foreignKey: {
      allowNull: false,
    },
  });
  record.belongsTo(category);
};
