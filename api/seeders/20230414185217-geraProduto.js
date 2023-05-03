const sequelize = require('sequelize');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('produtos', [
      {
        codigo: '001',
        produto: 'coca-cola lata',
        srcProduto: "./src/coca-lata.png",
        quantidade: '5',
        dataEntrada: sequelize.literal('NOW()'),
        valor: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        codigo: '002',
        produto: 'guarana lata',
        srcProduto: "./src/guarana-lata.png",
        quantidade: '15',
        valor: 3.50,
        dataEntrada: sequelize.literal('NOW()'),
        createdAt: new Date(),
        updatedAt: new Date()
      }



    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
