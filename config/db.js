const { Pool } = require('pg')


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hackathon_db',
    password: 'root',
    port: 5432,
})

module.exports = {
    query: (statement, params) => pool.query(statement, params)
}

// PORT=3000
// PGUSER=postgres
// PGHOST=localhost
// PGDATABASE=lending_system
// PGPASSWORD=root
// PGPORT=5432