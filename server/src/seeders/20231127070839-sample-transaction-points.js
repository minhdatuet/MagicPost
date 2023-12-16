'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TransactionPoints', [
      {
        // Sample data for the first record
        warehouseId: '1',
        pointLeaderId: '2',
        name: 'Cau Giay 1',
        address: 'alfksjl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Add more records as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('TransactionPoints', null, {});
  },
};
