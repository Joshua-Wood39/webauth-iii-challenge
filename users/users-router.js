const router = require('express').Router();
const Users = require('./users-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../api/secrets.js').jwtSecret;
const restricted = require('../users/restricted-middleware.js');


router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 6);
    user.password = hash;

    Users
    .add(user)
    .then(good => {
        res.status(201).json(good);
    })
    .catch(error => {
        res.status(500).json({ error: 'New user could not be registered!'})
    })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users
    .findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: `Logging you in, ${user.username}`, token: token })
        } else {
            res.status(401).json({ message: 'You shall not pass!' });
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'There was a server while logging in'})
    })
})

router.get('/users', restricted, (req, res) => {
    Users
    .find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: 'Could not retrieve data...'})
    })
})


// -------------------- Token Maker ------------------------------------

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options);
}

module.exports = router;