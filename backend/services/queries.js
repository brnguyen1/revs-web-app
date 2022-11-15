const { Pool } = require('pg');
const format = require('pg-format');

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false }
});

async function select_all_query(entity) {
    const query = format("SELECT * FROM %I", entity)
    return pool.query(query)
}

async function select_one(entity, id){
    const query = format("SELECT * FROM %I WHERE id = %I", entity, id)
    return pool.query(query)
}

module.exports = { select_all_query }