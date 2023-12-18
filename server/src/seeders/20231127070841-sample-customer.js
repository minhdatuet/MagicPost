'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Customers', [
      {
        // Sample data for the first record
        name: 'Khach 1',
        phone: '123',
        address: 'alfksjl',
      },
      {
        // Sample data for the first record
        name: 'Khach 2',
        phone: '124',
        address: 'alfksjl',
      },
      {
        // Sample data for the first record
        name: 'Khach 3',
        phone: '125',
        address: 'alfksjl',
      },
      {
        // Sample data for the first record
        name: 'Khach 4',
        phone: '126',
        address: 'alfksjl',
      }
      
      // Add more records as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Customers', null, {});
  },
};
