const Marca = require('../models/marcaModel');

const marcaController = {
    createMarca: (req, res) => {
        const newMarca = {
            nome: req.body.nome
        };

        Marca.create(newMarca, (err, MarcaId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/marca');
        });
    },

    getMarcaById: (req, res) => {
        const marcaId = req.params.id;

        Marca.findById(marcaId, (err, marca) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!marca) {
                return res.status(404).json({ message: 'Marca not found' });
            }
            res.render('marca/show', { marca });
        });
    },

    getAllMarca: (req, res) => {
        Marca.getAll((err, marca) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('marca/index', { marca });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('marca/create');
    },

    renderEditForm: (req, res) => {
        const marcaId = req.params.id;

        Marca.findById(marcaId, (err, marca) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!marca) {
                return res.status(404).json({ message: 'Marca not found' });
            }
            res.render('marca/edit', { marca });
        });
    },

    updateMarca: (req, res) => {
        const marcaId = req.params.id;
        const updatedMarca = {
            nome: req.body.nome
        };

        Marca.update(marcaId, updatedMarca, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/marca');
        });
    },

    deleteMarca: (req, res) => {
        const marcaId = req.params.id;

        Marca.delete(marcaId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/marca');
        });
    }
};

module.exports = marcaController;
