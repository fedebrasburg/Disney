import pg from 'pg'
const PGUSER = 'postgres'
const PGDATABASE = 'disney'
const config = {
  user: PGUSER, // name of the user account
  database: PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
}

const pool =  new pg.Pool(config);

const getPool = () => pool;

module.exports = getPool;