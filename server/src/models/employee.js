'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.belongsTo(models.Accounts, { foreignKey: 'accountId' }),
      Employee.belongsTo(models.Warehouse, { foreignKey: 'warehouseId' }),
      Employee.belongsTo(models.TransactionPoint, { foreignKey: 'transactionPointId' })
    }
  }
  Employee.init({
    accountId: DataTypes.INTEGER,
    transactionPointId: DataTypes.INTEGER,
    warehouseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};