const { Categoria } = require('../models');

const categoriaController = {
    getAllCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('categorias/index', { categorias }); // <-- nome correto
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('categorias/create');
    },

    createCategoria: async (req, res) => {
        try {
            await Categoria.create({ nome: req.body.nome });
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getCategoriaById: async (req, res) => {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.render('categorias/show', { categoria });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.render('categorias/edit', { categoria });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateCategoria: async (req, res) => {
        try {
            await Categoria.update(
                { nome: req.body.nome },
                { where: { id: req.params.id } }
            );
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteCategoria: async (req, res) => {
        try {
            await Categoria.destroy({ where: { id: req.params.id } });
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = categoriaController;
