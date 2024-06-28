const Product = require('../models/product');
const { Op } = require('sequelize');


exports.createProduct = async (req, res) => {
    try {
        const products = req.body.products;

        if (Array.isArray(products)) {
            // Handle multiple product creation
            const createdProducts = await Product.bulkCreate(products);
            res.status(201).json(createdProducts);
        } else {
            // Handle single product creation
            const createdProduct = await Product.create(req.body);
            res.status(201).json(createdProduct);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const [updated] = await Product.update(req.body, {
            where: { productId: req.params.id }
        });
        if (updated) {
            const updatedProduct = await Product.findByPk(req.params.id);
            res.status(200).json(updatedProduct);
        } else {
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { ids } = req.body;

        if (id) {
            // Handle single product deletion using req.params.id
            const deleted = await Product.destroy({
                where: { productId: id }
            });
            if (deleted) {
                res.status(200).json({ message: 'Product deleted' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } else if (Array.isArray(ids)) {
            // Handle multiple product deletion using req.body.ids
            const deleted = await Product.destroy({
                where: {
                    productId: {
                        [Op.in]: ids
                    }
                }
            });

            if (deleted) {
                res.status(200).json({ message: 'Products deleted successfully', count: deleted });
            } else {
                res.status(404).json({ message: 'No products found to delete.' });
            }
        } else {
            throw new Error('Invalid input: Provide either an id parameter or an array of ids in the request body');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
