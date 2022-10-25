const {Router} = require('express');
const {Group, Ask, User} = require("../models");
const {body} = require("express-validator");
const router = Router();

router.get('/groups', async (req, res) => {
    
    try {
        const groups = await Group.findAll({
            where: {...req.query},
            include: [
                {model: User , as: 'members', attributes: ['id', 'firstName', 'lastName', 'avatar', 'slug']},
            ],
            paranoid: true
        });
        if(!groups) return res.sendStatus(404);
        res.json(groups);
    } catch (err) {res.sendStatus(500);console.error(err);}
    
});

router.get('/groups/:id', async (req, res) => {

        try {
            const group = await Group.findOne({
                where: {id: req.params.id, ...req.query},
                include: [
                    {model: User , as: 'members', attributes: ['id', 'firstName', 'lastName', 'avatar', 'slug']},
                    {model: Ask, as: 'requests', attributes: ['userID']},
                ],
                paranoid: true
            });
            if(!group) return res.sendStatus(404);
            res.json(group);
        } catch (err) {res.sendStatus(500);console.error(err);}
});

router.post('/groups',
    body('maxUsers').isInt({min: 2}),
    body('ownerID').isInt(),
    body('isPrivate').isBoolean(),
    async (req, res) => {
        try {
            const group = await Group.create(req.body);
            res.status(201).json(group);
        } catch (err) {res.sendStatus(500);console.error(err);}
});

router.patch('/groups/:id', async (req, res) => {
    try {
        const group = await Group.findOne({
            where: {id: req.params.id},
            paranoid: true
        });
        if(!group) return res.sendStatus(404);
        await group.update(req.body);
        res.json(group);
    } catch (err) {res.sendStatus(500);console.error(err);}
});

router.delete('/groups/:id', async (req, res) => {
    try {
        const group = await Group.findOne({
            where: {id: req.params.id},
            paranoid: true
        });
        if(!group) return res.sendStatus(404);
        await group.destroy();
        res.sendStatus(204);
    } catch (err) {res.sendStatus(500);console.error(err);}
});

module.exports = router;

