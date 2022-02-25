const service = require('../services/chapters.service');


async function getAll(req, res, next) {
    try {
        res.json(await service.getAll());
    } catch (err) {
        console.error(`Error while getting users`, err.message);
        next(err);
    }
}

async function get(req, res, next) {
    try {
        res.json(await service.get(req.params.id));
    } catch (err) {
        console.error(`Error while getting comic`, err.message);
        next(err);
    }
}

module.exports = {
    getAll,
    get
};