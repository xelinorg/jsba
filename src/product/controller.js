const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Product = require('./model');

module.exports = function () {
    router.get(
        '/product',
        async (req, res) => {
            try {
                let product = await Product.find({});

                return res.status(200).json(product);
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Error in getting product list');
            }
        }
    );

    router.get(
        '/product/:id',
        async (req, res) => {
            try {
                let product = await Product.find({_id: req.params.id});

                return res.status(200).json(product);
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Error in getting product by id');
            }
        }
    );

    router.post(
        '/product',
        async (req, res) => {
            try {
                const { name, price, description } = req.body;
                const userId = req.user.id;
                let product = new Product({
                    name,
                    price,
                    description,
                    created_by: userId
                });

                product.save();

                return res.status(200).json(product);
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Error in creating product');
            }
        }
    );

    router.delete(
        '/product/:id',
        async (req, res) => {
            try {
                let product = await Product.deleteOne({_id: req.params.id});

                return res.status(200).json(product);
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Error in deleting product');
            }
        }
    );

    router.put(
        '/product/:id',
        [
            check('name', 'enter a valid product name').not().isEmpty(),
            check('price', 'enter a valid product price').not().isEmpty(),
            check('description', 'enter a valid product description').not().isEmpty()
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }
            const { name, price, description } = req.body;
            try {
                let product = await Product.updateOne({_id: req.params.id}, { name, price, description } );

                return res.status(200).json(product);
            } catch (err) {
                console.log(err.message);
                res.status(500).send('error on deleting product');
            }
        }
    );

    return router;
};
