const pgp = require('pg-promise')(/* options */)
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'humer2001',
    max: 30 // use up to 30 connections

    // "types" - in case you want to set custom type parsers on the pool level
};
const db = pgp(cn);

var cols = [];

db.result('select * from newtable').then(res =>{
    console.log(res.rows)
    cols = res.rows
    console.log(cols)
})

// console.log(cols)