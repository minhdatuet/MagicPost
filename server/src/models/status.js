'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status.belongsTo(models.Package, {foreignKey: 'packageId'})
    }
  }
  Status.init({
    packageId: DataTypes.INTEGER,
    nameOfStatus: DataTypes.ENUM(['DELIVERING', 'SUCCESS', 'FAILED']),
    dateTransactionPointStart: DataTypes.DATE,
    dateWarehouseStart: DataTypes.DATE,
    dateWarehouseEnd: DataTypes.DATE,
    dateTransactionPointEnd: DataTypes.DATE,
    receiveDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};