const mysql = require('mysql2/promise');

let connection = null;

async function connect() {
    if (connection) {
        return connection;
    }

    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'kaizen',
    });

    return connection;
}

async function query(sql, ...params) {
    const connection = await connect();
    return connection.query(sql, ...params);
}

async function execute(sql, ...params) {
    const connection = await connect();
    return connection.execute(sql, ...params);
}

module.exports = {
    query,
    execute
};