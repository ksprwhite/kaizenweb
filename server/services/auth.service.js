const bcypt = require('bcrypt');
const db = require('../services/database.service');
const usersService = require('../services/users.service');
const jwt = require('jsonwebtoken');


async function login(username, password) {
    let [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    
    if (rows.length === 0) {
        return {
            status: 'error',
            code: 204,
            message: 'usuario no encontrado'
        };
    }

    const user = rows[0];
    const match = await bcypt.compare(password, user.password);

    if (!match) {
        return {
            status: 'error',
            code: 204,
            message: 'credenciales invalidas'
        };
    }

    [rows] = await db.execute('SELECT * FROM roles WHERE id = ?', [user.role_id]);

    const data = {
        id: user.id, 
        username: user.username, 
        email: user.email,
        role: rows[0]
    };

    return {
        status: 'success',
        code: 200,
        data
    };
}

async function register(user) {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [user.username]);
    
    if (rows.length > 0) {
        return {
            status: 'error',
            code: 204,
            message: 'usuario ya existe'
        };
    }

    const hash = await bcypt.hash(user.password, 10);

    await db.execute('INSERT INTO users (username, password, email, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [user.username, hash, user.email, 2, new Date(), new Date()]);

    return {
        status: 'success',
        code: 200,
        message: 'usuario creado con exito'
    };
}

async function logout(refreshToken) {
    const [rows] = await db.execute('SELECT * FROM users WHERE refresh_token = ?', [refreshToken]);

    if (rows.length === 0) {
        return {
            'status': 'error',
            'code': 204,
            'message': 'token invalido'
        };
    }

    const user = rows[0];

    await db.execute('UPDATE users SET refresh_token = NULL WHERE id = ?', [user.id]);

    return {
        status: 'success',
        code: 200,
        message: 'logout exitoso'
    };
}

module.exports = {
    login,
    register,
    logout
}