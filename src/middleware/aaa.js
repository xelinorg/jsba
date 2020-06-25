const jwt = require('jsonwebtoken');

const BlackList = require('./blacklist');

module.exports = function (secret, notprotected, logoutPath) {
    return function (req, res, next) {
        if (notprotected.includes(req.path)) {
            return next();
        }
        const bearer = req.header('Authorization');
        if (!bearer) return res.status(401).json({ message: 'authentication error: missing token' });
        try {
            const token = bearer.split(' ')[1];
            const decoded = jwt.verify(token, secret);

            BlackList.findOne({
                token: token
            }).exec().then(
                (found) => {
                    if (found) return res.status(401).send({ message: 'authentication error: invalid token' });
                    if (req.path === logoutPath) {
                        const logout = new BlackList({
                            token: token,
                            userId: decoded.user.id
                        });
                        logout.save();
                        return res.status(200).json({ message: 'successfully logout' });
                    }
                    req.user = decoded.user;
                    return next();
                }
            );
        } catch (e) {
            console.error(e);
            res.status(401).send({ message: 'authentication error: invalid token' });
        }
    };
};
