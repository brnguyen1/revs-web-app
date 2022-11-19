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

async function select_all_query(entity, res) {
    const query = format("SELECT * FROM %I", entity)
    return pool.query(query, function (err, data) {
        if (err) return console.log("Query Error");

        res.json(data.rows)
    })
}

async function select_one_query(entity, id, res) {
    const query = format("SELECT * FROM %I WHERE id = %L", entity, id)
    return pool.query(query, function (err, data) {
        if (err) return console.log("Query Error");

        res.json(data.rows)
    })
}

async function add_one_query(entity, req, res){
    console.log(req.body)
    // const query = format("INSERT INTO %I (%L) WHERE VALUES (%L)", entity)
    res.send("Nice post")
}

async function update_one_query(entity, req, res){

}

async function delete_one_query(entity, req, res){

}


module.exports = { select_all_query, select_one_query, add_one_query }