const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'produtos',
  timestamps: false
});

Produto.createProduto = async (produto) => {
  const novoProduto = await Produto.create({
    nome: produto.nome,
    descricao: produto.descricao,
    preco: produto.preco,
    quantidade: produto.quantidade,
    categoria: produto.categoria
  });
  return novoProduto.id;
};

Produto.findById = async (id) => {
  return await Produto.findByPk(id, {
    include: [
      {
        model: require('./categoriaModel'),
        as: 'categoriaInfo',
        attributes: ['nome']
      }
    ]
  });
};

Produto.updateProduto = async (id, produto) => {
  return await Produto.update(
    {
      nome: produto.nome,
      preco: produto.preco,
      descricao: produto.descricao,
      quantidade: produto.quantidade,
      categoria: produto.categoria
    },
    { where: { id } }
  );
};

Produto.deleteProduto = async (id) => {
  return await Produto.destroy({ where: { id } });
};

Produto.getAll = async (categoria) => {
  const where = categoria ? { categoria } : {};
  return await Produto.findAll({
    where,
    include: [
      {
        model: require('./categoriaModel'),
        as: 'categoriaInfo',
        attributes: ['nome']
      }
    ]
  });
};

module.exports = Produto;