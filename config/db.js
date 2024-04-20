
//dotenv
require("dotenv").config();
const pg = require('pg')
const { Pool } = pg

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;


const config = {
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    allowExitOnIdle: true
}

const pool = new Pool(config)


module.exports = {pool}


