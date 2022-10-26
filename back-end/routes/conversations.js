const {Router} = require('express');
const {UserGroup} = require("../models");
const {body} = require("express-validator");

const router = Router();


router.post('/conversations',
    body('userID').isInt(),
    async (req,res) => {
        try {
            const conversation = await UserGroup.create(req.body);
            res.status(201).json(conversation) ;
        } catch(err) {res.sendStatus(500);console.error(err);}
});

router.get('/conversations', async (req,res) => {
   try{
       const conversations = await UserGroup.findAll({
           where: {...req.query},
           paranoid: true
       });
       if(!conversations) return res.sendStatus(404) ;
       res.json(conversations) ;
   } catch (err) {res.sendStatus(500);console.error(err);}
});

module.exports = router;


