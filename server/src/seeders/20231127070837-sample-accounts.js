'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accounts', [
      {
        // Sample data for the first record
        name: 'Huong',
        phone: '1',
        password: '$2a$12$KWsBu7OmGDnLeN99x01IgO239qVR5OFP/nRw/7YxdU.uI4GDUpaO.',
        accountType: 'BOSS',
        address: 'alfksjl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // Sample data for the first record
        name: 'Dat',
        phone: '2',
        password: '$2a$12$KWsBu7OmGDnLeN99x01IgO239qVR5OFP/nRw/7YxdU.uI4GDUpaO.',
        accountType: 'POINT_LEADER',
        address: 'alfksjl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // Sample data for the second record
        name: 'Vi',
        phone: '3',
        password: '$2a$12$KWsBu7OmGDnLeN99x01IgO239qVR5OFP/nRw/7YxdU.uI4GDUpaO.',
        accountType: 'WAREHOUSE_LEADER',
        address: 'alfksjl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // Sample data for the first record
        name: 'Huy',
        phone: '4',
        password: '$2a$12$KWsBu7OmGDnLeN99x01IgO239qVR5OFP/nRw/7YxdU.uI4GDUpaO.',
        accountType: 'POINT_STAFF',
        address: 'alfksjl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // Sample data for the first record
        name: 'Lien',
        phone: '5',
        password: '$2a$12$KWsBu7OmGDnLeN99x01IgO239qVR5OFP/nRw/7YxdU.uI4GDUpaO.',
        accountType: 'WAREHOUSE_STAFF',
        address: 'alfksjl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // Sample data for the first record
        name: 'Van',
        phone: '6',
        password: '$2a$12$KWsBu7OmGDnLeN99x01IgO239qVR5OFP/nRw/7YxdU.uI4GDUpaO.',
        accountType: 'POINT_STAFF',
        address: 'alfksjl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // Sample data for the first record
        name: 'Hoa',
        phone: '7',
        password: '$2a$12$KWsBu7OmGDnLeN99x01IgO239qVR5OFP/nRw/7YxdU.uI4GDUpaO.',
        accountType: 'WAREHOUSE_STAFF',
        address: 'alfksjl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more records as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Accounts', null, {});
  },
};
