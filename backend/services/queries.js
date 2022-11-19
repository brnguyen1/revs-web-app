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

// async function update(entity, field, updated_data, id){
//     const query = format("UPDATE %I SET I% = %L WHERE ID = %I", entity, field, updated_data, id)
//     return pool.query(query)
// }

// async function delete_item(entity, id){
//     const query = format("DELETE FROM %I WHERE ID = %I", entity, id)
//     return pool.query(query)
// }

module.exports = { select_all_query }
async function add_one_query(entity, req, res){
    console.log(req.body)
    // const query = format("INSERT INTO %I (%L) WHERE VALUES (%L)", entity)
    res.send("Nice post")
}

async function update_one_query(entity, updated_data, id, req, res){
    console.log(req.body)
    const query = format("UPDATE %I SET I% = %L WHERE ID = %I", entity, field, updated_data, id)
    res.send("Nice post - updated one query")
    return pool.query(query)
}

async function delete_one_query(entity, id, req, res){
    console.log(req.body)
    const query = format("DELETE FROM %I WHERE ID = %I", entity, id)
    res.send("Nice post - deleted one query")
    return pool.query(query)
}


module.exports = { select_all_query, select_one_query, add_one_query }
