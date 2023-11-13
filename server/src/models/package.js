'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Package.init({
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    transactionPointStartId: DataTypes.INTEGER,
    warehouseStartId: DataTypes.INTEGER,
    warehouseEndId: DataTypes.INTEGER,
    transactionPointEndId: DataTypes.INTEGER,
    name: DataTypes.STRING(30),
    shippingCost: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Package',
  });
  return Package;
};