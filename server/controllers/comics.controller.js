const service = require('../services/comics.service');


async function getAll(req, res, next) {
    try {
        res.json(await service.getAll());
    } catch (err) {
        console.error(`Error while getting comics`, err.message);
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

async function create(req, res, next) {
    try {
        res.json(await service.create(req.body));
    } catch (err) {
        console.error(`Error while creating comic`, err.message);
        next(err);
    }
}

async function update(req, res, next) {
    try {
        res.json(await service.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating comic`, err.message);
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        res.json(await service.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting comic`, err.message);
        next(err);
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove
};