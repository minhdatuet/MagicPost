'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Statuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      packageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'packages', key: 'id' }
      },
      nameOfStatus: {
        allowNull: false,
        type: Sequelize.ENUM(['DELIVERING', 'SUCCESS', 'FAILED'])
      },
      dateTransactionPointStart: {
        allowNull: false,
        type: Sequelize.DATE
      },
    dateWarehouseStart: {
        allowNull: true,
        type: Sequelize.DATE
    },
    dateWarehouseEnd: {
        allowNull: true,
        type: Sequelize.DATE
    },
    dateTransactionPointEnd: {
        allowNull: true,
        type: Sequelize.DATE
    },
    receiveDate: {
        allowNull: true,
        type: Sequelize.DATE
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Statuses');
  }
};