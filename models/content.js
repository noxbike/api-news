'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Content.belongsTo(models.Article,{
        foreignKey: 'idarticle'
      });
      models.Content.hasMany(models.Comment);
    }
  };
  Content.init({
    content: DataTypes.TEXT,
    idarticle: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};