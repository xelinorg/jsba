const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('./model');

module.exports = function (secret) {
    router.post(
        '/user/register',
        [
            check('username', 'enter a valid username').not().isEmpty(),
            check('password', 'enter a valid password').isLength({ min: 6 })
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }
            const { username, password } = req.body;
            try {
                let user = await User.findOne({
                    username
                });
                if (user) {
                    return res.status(400).json({
                        msg: 'user already exists'
                    });
                }

                user = new User({
                    username,
                    password,
                    role: 'client'
                });

                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);

                await user.save();

                const payload = {
                    user: {
                        id: user.id
                    }
                };

                jwt.sign(
                    payload,
                    secret,
                    {
                        expiresIn: 10000
                    },
                    (err, token) => {
                        if (err) throw err;
                        res.status(200).json({
                            token
                        });
                    }
                );
            } catch (err) {
                console.log(err.message);
                res.status(500).send('error on saving user');
            }
        }
    );

    router.post(
        '/user/login',
        [
            check('username', 'enter a valid username').not().isEmpty(),
            check('password', 'enter a valid password').isLength({min: 6})
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            const { username, password } = req.body;
            try {
                let user = await User.findOne({
                    username
                });
                if (!user) return res.status(400).json({message: 'user does not exist'});

                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) return res.status(400).json({message: 'incorrect password !'});

                const payload = {
                    user: {
                        id: user.id
                    }
                };

                jwt.sign(
                    payload,
                    secret,
                    {
                        expiresIn: 3600
                    },
                    (err, token) => {
                        if (err) throw err;
                        res.status(200).json({
                            token
                        });
                    }
                );
            } catch (e) {
                res.status(500).json({
                    message: 'error on login user'
                });
            }
        }
    );

    router.get('/user/me', async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            res.json(user);
        } catch (e) {
            res.send({ message: 'error on getting user' });
        }
    });

    return router;
};
