'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Warehouses', [
      {
        // Sample data for the first record
        name: 'Cau Giay',
        address: 'alfksjl',
        leaderId: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Add more records as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Warehouses', null, {});
  },
};
