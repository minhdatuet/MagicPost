'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Statuses', [
      {
        // Sample data for the first record
        packageId: '1',
        nameOfStatus: 'DELIVERING',
        dateSendPackage: new Date()
      },
      
      // Add more records as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Statuses', null, {});
  },
};
