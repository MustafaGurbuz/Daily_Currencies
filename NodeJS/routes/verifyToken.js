const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(400).send('Access Denied');

    try {
        const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verifiedToken;
        next()
    } catch (err) {
        res.status(400).send('Invalid Token!');
    }
}