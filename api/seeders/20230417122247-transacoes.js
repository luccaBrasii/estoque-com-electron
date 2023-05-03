'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    Example:
    await queryInterface.bulkInsert('transacaos', [{
      cod: 1,
      produto: "coca-cola lata",
      data: new Date(),
      operacao: "adicionar",
      quantidade: 17,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

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
