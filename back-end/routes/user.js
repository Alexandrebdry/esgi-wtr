const {Router} = require('express');
const {User} = require("../models");
const {body} = require("express-validator");
const router = Router();

router.get('/getUser/:id', async (req, res) => {
    try{
        const results = await User.findOne({
            where: {id: req.params.id},
            paranoid: true
        });
        if(!results) return res.sendStatus(404) ;
        res.json(results) ;
    } catch (err) {res.sendStatus(500);console.error(err);}
});

router.put('/setUserStatus/:id', async (req, res) => {
    
    try{

        const results = await User.update(
            { isOnline: req.body.status },
            { where: {id: req.params.id} }
        )

        if(results == 1){
            res.status(200).json({msg : "Statut modifié avec succès !"});
        }else{
            res.status(404).json({ msg : "Impossible de trouver cet utilisateur"});
            console.log(req);
        }

    }catch(error){
        res.status(500).json(error);
    }
    
});

module.exports = router;