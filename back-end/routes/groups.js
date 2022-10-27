const {Router} = require('express');
const {Group, Ask, User, Conversation, Message} = require("../models");
const {body} = require("express-validator");
const router = Router();

router.get('/groups', async (req, res) => {
    
    try {
        const groups = await Group.findAll({
            where: {...req.query},
            include: [
                {model: User, through: 'conversations', as:'members', attributes: [
                        'id', 'email','firstName','lastName','avatar','role'
                    ]},
                {model: User,  as: 'owner_id', attributes: [
                    'id', 'email','firstName','lastName','avatar','role'
                ]},
                {model: Ask, as: 'requests'}
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
        const conversations = await Conversation.findAll({
            where: {groupID: group.id},
            paranoid: true
        }) ;
        if(conversations)
            for(const conversation of conversations) {
                await conversation.update({name: group.name}) ;
            }
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

        const conversation = await Conversation.findAll({
            where: {groupID: req.params.id},
            paranoid: true
        }) ;
        if (conversation)
            for (const convo of conversation) {await convo.destroy() ;}


        const asks = await Ask.findAll({
            where: {groupID: req.params.id},
            paranoid: true
        }) ;
        if(asks)
            for (const ask of asks) {await ask.destroy();}

        const messages = await Message.findAll({
            where: {groupID: req.params.id},
            paranoid:true
        });
        if(messages)
            for(const message of messages) {
                await message.destroy() ;
            }


        await group.destroy();
        res.sendStatus(204);
    } catch (err) {res.sendStatus(500);console.error(err);}
});

module.exports = router;

