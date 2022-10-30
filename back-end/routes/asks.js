const {Router} = require('express') ;
const {body} = require('express-validator') ;
const router = Router() ;
const {Ask, User, Group} = require('../models') ;

router.post('/asks',
    body('userID').isInt(),
    body('groupID').isInt(),
    async(req,res) =>{
    try{
        const ask = Ask.create(req.body) ;
        res.status(201).json(ask) ;
    } catch(err) {console.error(err); res.sendStatus(500);}
}) ;

router.get('/asks',async(req,res)=>{
   try{
       const asks = await Ask.findAll({
           where: {...req.query},
           include: [
               {model: User, as: 'user_id', attributes: ['id','firstName','lastName']},
               {model: Group , as :'group_id'}
           ],
           paranoid: true
       });
       if(!asks) return res.sendStatus(404) ;
       res.json(asks) ;
   } catch(err){console.error(err); res.sendStatus(err);}
});

router.delete('/asks/:id',async(req,res) => {
    try{
        const ask = await Ask.findByPk(req.params.id ,{paranoid:true});
        if(!ask) return res.sendStatus(404) ;
        await ask.destroy() ;
        res.sendStatus(204) ;
    } catch(err){console.error(err); res.sendStatus(500);}
}) ;

module.exports = router ;