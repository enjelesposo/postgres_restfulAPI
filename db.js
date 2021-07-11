const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '6053715KaKA',
    database: 'todo_database',
    host: 'localhost',
    port: 5432
});

module.exports = pool;