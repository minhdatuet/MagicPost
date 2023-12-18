'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Packages', [
      {
        // Sample data for the first record
        senderId: '1',
        receiverId: '2',
        transactionPointStartId: '1',
        name: 'Banh Mi',
        shippingCost: '10000'
      },
      
      // Add more records as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Packages', null, {});
  },
};
