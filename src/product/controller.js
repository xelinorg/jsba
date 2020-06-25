const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Product = require('./model');

const modifyRestriction = check()
    .custom((validatorCtx, connectionCtx ) => {
        if (connectionCtx.req.user.role === 'client') {
            return false;
        }
        return true;
    })
    .withMessage('only admins can modify a product');

const productValidation = [
    check('name', 'enter a valid product name').not().isEmpty(),
    check('price', 'enter a valid product price').not().isEmpty(),
    check('description', 'enter a valid product description').not().isEmpty(),
    modifyRestriction
];

const reduceErrorMsg = (errors) => {
    return errors.reduce((acc, cur)=> {
        if (!acc.includes(cur.msg)) {
            acc.push(cur.msg);
        }
        return acc;
    }, []);
};

module.exports = function () {
    router.get(
        '/product',
        async (req, res) => {
            try {
                const offset = req.query.offset && !isNaN(parseInt(req.query.offset)) ? parseInt(req.query.offset) : 0;
                const size = req.query.size && !isNaN(parseInt(req.query.size)) ? parseInt(req.query.size) : 0;
                const fieldSelection = req.user.role === 'admin' ? '' : '-created_by';
                const product = await Product.find({}).select(fieldSelection).limit(size).skip(offset);
                return res.status(200).json(product);
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Error on getting product list');
            }
        }
    );

    router.get(
        '/product/:id',
        async (req, res) => {
            try {
                const fieldSelection = req.user.role === 'admin' ? '' : '-created_by';
                const product = await Product.find({_id: req.params.id}).select(fieldSelection);

                return res.status(200).json(product);
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Error on getting product by id');
            }
        }
    );

    router.post(
        '/product',
        productValidation,
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: reduceErrorMsg(errors.array())
                });
            }
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
                res.status(500).send('Error on creating product');
            }
        }
    );

    router.delete(
        '/product/:id',
        modifyRestriction,
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: reduceErrorMsg(errors.array())
                });
            }
            try {
                let product = await Product.deleteOne({_id: req.params.id});

                return res.status(200).json(product);
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Error on deleting product');
            }
        }
    );

    router.put(
        '/product/:id',
        productValidation,
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: reduceErrorMsg(errors.array())
                });
            }
            const { name, price, description } = req.body;
            try {
                let product = await Product.updateOne({_id: req.params.id}, { name, price, description } );

                return res.status(200).json(product);
            } catch (err) {
                console.log(err.message);
                res.status(500).send('error on updating product');
            }
        }
    );

    return router;
};
