const {Pool}= require('pg');
require('dotenv').config();

let sslConfig=false;

if (process.env.NODE_ENV === 'production') {
    sslConfig = process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false;
}

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database : process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    ssl: sslConfig,
    max:20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis:2000
});

module.exports=pool;

