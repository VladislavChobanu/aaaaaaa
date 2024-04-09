/** @type {import('sequelize-cli').Migration} */
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const getSudents = require('../../utils/getNames');

module.exports = {
  async up(queryInterface, Sequelize) {
    const imgs = await fs.readdir(path.join(__dirname, '..', '..', 'public', 'img'));
    const groups = [
      'arctics-foxes',
      'bears',
      'beavers',
      'bees',
      'buffalos',
      'eagles',
      'foxes',
      'hedgehogs',
      'jays',
      'lynxes',
      'owls',
      'raccons',
      'snow-leopards',
      'tigers',
      'whales',
      'wolves',
    ].map((name, index) => ({
      name,
      img: `${imgs[index]}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const students = getSudents(groups.length * 5).map((student, index) => ({
      ...student,
      groupId: Math.floor(index / 5) + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: await bcrypt.hash('admin', 10),
        email: 'admin@admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('Groups', groups);
    await queryInterface.bulkInsert('Students', students);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
