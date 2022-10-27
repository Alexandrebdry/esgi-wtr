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

module.exports = router;


