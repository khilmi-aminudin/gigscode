'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gigs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Gigs.init({
    title: DataTypes.STRING,
    technologies: DataTypes.STRING,
    budget: DataTypes.STRING,
    description: DataTypes.STRING,
    contact_email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gigs',
  });
  return Gigs;
};