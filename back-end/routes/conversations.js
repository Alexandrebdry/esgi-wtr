const {Router} = require('express');
const {Conversation} = require("../models");
const {body} = require("express-validator");

const router = Router();

router.post('/conversations',
    body('userID').isInt(),
    async (req,res) => {
        try {
            const conversation = await Conversation.create(req.body);
            res.status(201).json(conversation) ;
        } catch(err) {res.sendStatus(500);console.error(err);}
});

router.get('/conversations', async (req,res) => {
   try{
       const conversations = await Conversation.findAll({
           where: {...req.query},
           paranoid: true
       });
       if(!conversations) return res.sendStatus(404) ;
       res.json(conversations) ;
   } catch (err) {res.sendStatus(500);console.error(err);}
});

router.patch('/conversation/:id', async (req,res) => {
    try{
        const conversation = await Conversation.findOne({
            where: {id: req.params.id},
            paranoid: true
        });
        if(!conversation) return res.sendStatus(404);
        await conversation.update(req.body);
        res.json(conversation);
    } catch(err) {res.sendStatus(500);console.error(err);}
})

router.get('/userConversation/:id', async (req,res) => {
    try{
        const conversation = await Conversation.findAll({
            where: {userID: req.params.id},
            paranoid: true
        });
        if(!conversation) return res.sendStatus(404);
        res.json(conversation);
    } catch(err) {res.sendStatus(500);console.error(err);}
})

module.exports = router;


