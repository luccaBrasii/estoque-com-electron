'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  produtos.init({
    codigo: DataTypes.INTEGER,
    produto: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.FLOAT,
    dataEntrada: DataTypes.DATE,
    srcProduto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'produtos',
  });
  return produtos;
};