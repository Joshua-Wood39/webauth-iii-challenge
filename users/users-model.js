const db = require('../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy
}

function add(body) {
    return db('users')
    .insert(body)
}

function find() {
    return db('users')
    .select('id', 'username', 'department', 'password')
}

function findBy(filter) {
    return db('users')
    .where(filter)
}