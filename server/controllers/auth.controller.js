const jwt = require('jsonwebtoken');
const service = require('../services/auth.service');
const db = require('../services/database.service');


async function login(req, res, next) {
    try {
        let result = await service.login(req.body.username, req.body.password);
        let statusCode = 200;

        if ('code' in result) {
            statusCode = result.code;
        }

        if (statusCode === 200) {
            const tokenData = { user: result.data };

            const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '1d'
            });

            const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: '1d'
            });

            await db.execute('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, result.data.id]);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
            });
            req.session.refreshToken = refreshToken;
            req.session.save();

            return res.status(statusCode).json({
                status: 'success',
                accessToken,
            });
        }

        res.status(statusCode).json({
            status: 'error',
            message: result.message,
        });
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

async function register(req, res, next) {
    try {
        const result = await service.register(req.body);
        let statusCode = 200;

        if ('code' in result) {
            statusCode = result.code;    
        }

        res.status(statusCode).json(result);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

async function logout(req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken;
    
        if (!refreshToken) {
            return res.status(200).json({
                'status': 'success',
                'message': 'token invalido'
            });
        }

        const result = await service.logout(refreshToken);
        let statusCode = 200;

        if ('code' in result) {
            statusCode = result.code;    
        }

        res.clearCookie('refreshToken');
        req.session.refreshToken = null;
        res.status(statusCode).json(result);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

async function refreshToken(req, res) {
    try {
        console.log('cookies', req.cookies, req.cookie);
        console.log('req.session', req.session.refreshToken);

        const authHeader = req.headers['authorization']
        const refreshToken = authHeader && authHeader.split(' ')[1];
        //const refreshToken = req.session.refreshToken;
        
        if(!refreshToken) {
            res.status(401).json({
                'status': 'error',
                'message': 'token invalido',
                'code': 'EMPTY_TOKEN'
            });

            return;
        }
        
        /*let decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        let [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [refreshToken]);

        if(rows.length === 0) {
            res.status(403).json({
                'status': 'error',
                'message': 'Usuario no encontrado',
                'code': 'INVALID_USER'
            });;

            return;
        }

        const user = rows[0];*/

        jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if(err) { 
                res.status(403).json({
                    'status': 'error',
                    'code': 'INVALID_TOKEN',
                    'message': 'token invalido'
                });

                return 
            }

            console.log(decoded);

            const user = decoded.user;
            let [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [user.id]);

            if(rows.length === 0) {
                res.status(403).json({
                    'status': 'error',
                    'message': 'Usuario no encontrado',
                    'code': 'INVALID_USER'
                });;
    
                return;
            }

            [rows] = await db.execute('SELECT * FROM roles WHERE id = ?', [user.role.id]);

            const tokenData = {
                user: {
                    id: user.id, 
                    username: user.username, 
                    email: user.email,
                    role: rows[0]
                }
            };

            const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });

            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login,
    register,
    logout,
    refreshToken
}