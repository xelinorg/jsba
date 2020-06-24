const jwt = require('jsonwebtoken');

module.exports = function (secret, notprotected) {
    return function (req, res, next) {
        if (notprotected.includes(req.path)) {
            return next();
        }
        const bearer = req.header('Authorization');
        if (!bearer) return res.status(401).json({ message: 'Authentication Error: missing token' });
        try {
            const decoded = jwt.verify(bearer.split(' ')[1], secret);
            req.user = decoded.user;
            next();
        } catch (e) {
            console.error(e);
            res.status(401).send({ message: 'Authentication Error: invalid token' });
        }
    };
};
