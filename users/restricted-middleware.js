const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js').jwtSecret;

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secrets, (error, decodedToken) => {
            if(error) {
                res.status(401).json({ error: 'Credentials: You shall not pass!'})
            } else {
                req.decodedJwt = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ error: 'Token: You shall not pass!'})
    }
}
