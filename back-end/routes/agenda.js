const {Router} = require('express');
const {Agenda, User} = require('../models');
const {body} = require('express-validator');
const router = Router();
const { Op } = require("sequelize");
const dateNow = new Date();

router.get('/creneaux', async (req, res) => {
    
    try {
        const creneaux = await Agenda.findAll({
            where: {
                ...req.query,
                userID: {
                    [Op.is]: null,
                },
                date: {
                    [Op.gte]: dateNow
                }
            },
            order: [
                ['date', 'ASC'],
            ]
        });
        if(!creneaux) return res.sendStatus(404);
        res.json(creneaux);
    } catch (err) {res.sendStatus(500);console.error(err);}
});

router.patch('/creneaux/:id', async (req, res) => {
    try {
        const creneau = await Agenda.findOne({
            where: {id: req.params.id, ...req.query},
            paranoid: true
        });
        if(!creneau) return res.sendStatus(404);
        await creneau.update(req.body);
        res.json(creneau);
    } catch(err) {res.sendStatus(500);console.error(err);}
});

router.get('/creneaux/isDriver', async (req, res) => {
    try {
        const creneauIsDriver = await Agenda.findAll({
            where: {
                ...req.query,
                userID: {
                    [Op.is]: null,
                },
                date: {
                    [Op.gte]: dateNow
                },
                isDriver: true
            },
            order: [
                ['date', 'ASC'],
            ]
        });
        if(!creneauIsDriver) return res.sendStatus(404);
        res.json(creneauIsDriver);
    } catch (err) {res.sendStatus(500);console.error(err);}
})

router.get('/creneaux/isOffRoad', async(req, res) => {
    try {
        const creneauIsOffRoad = await Agenda.findAll({
            where: {
                ...req.query,
                userID: {
                    [Op.is]: null,
                },
                date: {
                    [Op.gte]: dateNow
                },
                isOffRoad: true
            },
            order: [
                ['date', 'ASC'],
            ]
        });
        if(!creneauIsOffRoad) return res.sendStatus(404);
        res.json(creneauIsOffRoad);
    } catch (err) {res.sendStatus(500);console.error(err);}
})

router.get('/creneaux/isSportDriver', async(req, res) => {
    try {
        const creneauIsSportDriver = await Agenda.findAll({
            where: {
                ...req.query,
                userID: {
                    [Op.is]: null,
                },
                date: {
                    [Op.gte]: dateNow
                },
                isSportDriver: true
            },
            order: [
                ['date', 'ASC'],
            ]
        });
        console.log(creneauIsSportDriver);
        if(!creneauIsSportDriver) return res.sendStatus(404);
        res.json(creneauIsSportDriver);
    } catch (err) {res.sendStatus(500);console.error(err);}
})

module.exports = router;