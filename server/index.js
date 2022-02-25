const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const usersService = require('./services/users.service');
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
});


app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://kaizen.localhost', 'http://200.105.253.153:3000', 'http://localhost:3000']
}));
app.use(sessionMiddleware);
//app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

usersService.ensureAdminAccount();

const routes = [
    {
        'path': '/comics',
        'router': require('./routes/comics.route')
    },
    {
        'path': '/chapters',
        'router': require('./routes/chapters.route')
    },
    {
        'path': '/auth',
        'router': require('./routes/auth.route')
    }
]

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'), err => {
        if (err) {
            console.log(err);
        }
    });
});

for (const route of routes) {
    app.use(route.path, route.router);
}

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});

app.listen(port, '0.0.0.0', () => {
    console.log(`listening at http://localhost:${port}`)
});