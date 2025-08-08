const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categorias',
  timestamps: false
});

// Métodos utilitários
Categoria.createCategoria = async (categoria) => {
  const novaCategoria = await Categoria.create({ nome: categoria.nome });
  return novaCategoria.id;
};

Categoria.findById = async (id) => {
  return await Categoria.findByPk(id);
};

Categoria.findByCategorianame = async (nome) => {
  return await Categoria.findOne({ where: { nome } });
};

Categoria.updateCategoria = async (id, categoria) => {
  return await Categoria.update(
    { nome: categoria.nome },
    { where: { id } }
  );
};

Categoria.deleteCategoria = async (id) => {
  return await Categoria.destroy({ where: { id } });
};

Categoria.getAll = async () => {
  return await Categoria.findAll();
};

module.exports = Categoria;