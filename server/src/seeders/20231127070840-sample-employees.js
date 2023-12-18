'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Employees', [
      {
        // Sample data for the first record
        accountId: '4',
        transactionPointId: '1',
      },
      {
        // Sample data for the first record
        accountId: '5',
        warehouseId: '1',
      },
      {
        // Sample data for the first record
        accountId: '6',
        transactionPointId: '1',
      },
      {
        // Sample data for the first record
        accountId: '7',
        warehouseId: '1',
      },
      // Add more records as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Employees', null, {});
  },
};
