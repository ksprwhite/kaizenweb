const db = require('./database.service');

async function getAll() {
    const [rows] = await db.execute('SELECT * FROM comics');
    return rows;
}

async function get(id) {
    const [rows] = await db.execute('SELECT * FROM comics WHERE id = ?', [id]);
    return rows[0];
}

module.exports = {
    getAll,
    get
}