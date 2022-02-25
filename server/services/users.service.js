const bcrypt = require('bcrypt');
const db = require('./database.service');

async function getAll() {
    const [rows, fields] = await db.execute('SELECT * FROM users');
    return rows;
}

async function get(id) {
    const [rows, fields] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

async function create(user) {
    const [rows, fields] = await db.execute(
        `
            INSERT INTO users (username, email, password, role_id, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?)
        `, 
        [user.username, user.email, user.password, user.role_id, new Date(), new Date()]
    );

    return rows;
}

async function update(id, user) {
    const [rows, fields] = await db.execute(
        `
            UPDATE users SET 
                username = ?,
                email = ?,
                password = ?,
                role_id = ?,
                updated_at = ?
            WHERE id = ?
        `, 
        [user.username, user.email, user.password, user.role_id, new Date(), id]
    );

    return rows;
}

async function remove(id) {
    const [rows, fields] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    return rows;
}

async function ensureAdminAccount() {
    let [rows, _] = await db.execute('SELECT * FROM roles', [1]);

    if (rows.length === 0) {
        await db.query('INSERT INTO roles (name, description, created_at, updated_at) VALUES ?', [[
            ['admin', 'admin role', new Date(), new Date()],
            ['user', 'user role', new Date(), new Date()],
        ]], true);
    }

    [rows, fields] = await db.execute('SELECT * FROM users WHERE username = ?', ['admin']);

    if (rows.length === 0) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync('admin', salt);
        const user = {
            username: 'admin',
            email: 'admin@kaizen.com',
            password: hash,
            role_id: 1
        };
        await create(user);
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove,
    ensureAdminAccount
}
