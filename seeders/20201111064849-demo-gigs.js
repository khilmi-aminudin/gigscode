'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const gigsDemo = []

    const faker = require('faker')

    for (let i = 0; i < 10; i++) {
      gigsDemo.push({
        title: faker.name.jobTitle(),
        technologies: faker.name.jobType(),
        budget: faker.finance.amount(),
        description: faker.lorem.sentence(),
        contact_email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return queryInterface.bulkInsert('Gigs', gigsDemo);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Gigs', null, {});
  }
};
