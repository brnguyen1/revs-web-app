const { request } = require('express');
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
    const query = format("SELECT * FROM %I ORDER BY id DESC", entity)

    pool.query(query, function (err, data) {
        if (err) return console.log("Query Error");

        res.json(data.rows)
    })
}
async function max_query(entity, res, req) {
    const query = format("SELECT MAX(ID) FROM %I", entity)

    pool.query(query, function (err, data) {
        if (err) return console.log("Query Error");

        req.json(data.rows)
    })
}
async function select_one_query(entity, id, res) {
    const query = format("SELECT * FROM %I WHERE id = %L", entity, id)

    pool.query(query, function (err, data) {
        if (err) return console.log("Query Error");

        res.json(data.rows)
    })
}

async function add_one_query(entity, req, res) {
    let values = Object.values(req.body).map(val => {
        if (Array.isArray(val)) {
            let arrayString = val.join('\",\"')
            arrayString = '{\"' + arrayString + '\"}'
            return arrayString
        }
        return val
    })

    const query = format("INSERT INTO %I(%I) VALUES(%L)", entity, Object.keys(req.body), values)
    console.log(query)

    pool.query(query, function (err, data) {
        if (err) return console.log("Query Error %s", err);
    })

    res.send("Nice post")

}

async function update_one_query(entity, req, res) {
    let values = Object.values(req.body).map(val => {

        if (Array.isArray(val)) {

            let arrayString = val.join('\",\"')
            arrayString = '{\"' + arrayString + '\"}'
            return arrayString
        }
        return val
    })



    for (let i = 0; i < values.length; i++) {

        const query = format("UPDATE %I SET %I = %L WHERE ID = %L", entity, Object.keys(req.body)[i], values[i], req.params.id)
        pool.query(query, function (err, data) {
            if (err) return console.log("Query Error %s", err);
        })
    }
    console.log(req.body)
    res.send("Nice post - updated one query")
}

async function delete_one_query(entity, req, res) {
    console.log(req.params)
    const query = format("DELETE FROM %I WHERE ID = %L", entity, req.params.id)
    pool.query(query, function (err, data) {
        if (err) return console.log("Query Error %s", err);
    })
    res.send("Nice post - deleted one item with id: " + req.params.id)

}

async function authenticate_user(entity, req, res) {
    const query = format("SELECT * FROM %I WHERE email = %L", entity, req.query.email)
    console.log(query)

    pool.query(query, function (err, data) {
        if (err) return console.log("Query Error");

        res.json(data.rows[0])
    })
}


module.exports = { select_all_query, select_one_query, add_one_query, update_one_query, delete_one_query, max_query, authenticate_user}
