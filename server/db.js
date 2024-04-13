const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Fonseca",
    host: "localhost",
    port: 5432,
    database: "caterorder"
});

module.exports = pool;