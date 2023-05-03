'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transacao.init({
    cod: DataTypes.INTEGER,
    produto: DataTypes.STRING,
    data: DataTypes.DATE,
    valor: DataTypes.STRING,
    operacao: DataTypes.STRING,
    quantidade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transacao',
  });
  return Transacao;
};