const {Router} = require('express') ;
const {body, validationResult} = require('express-validator');
const {User} = require('../models') ;
const jwt = require('jsonwebtoken') ;

const {generateCode} = require("../services/codeGenerator");
const {ValidationError} = require("sequelize");
const {confirmationEmail} = require("../mailing/nodemailer.config");

const router = Router() ;

router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({min: 6}),
    body('firstName').isLength({min: 2}),
    body('lastName').isLength({min: 2}),
    async (req, res) => {
        try{
            const user = await User.findOne({
                    where: {email: req.body.email},
                    paranoid: false}
            ) ;
            if(user)
                return res.status(400).json({message: "User already exists."}) ;
            else {
                const token = generateCode();
                const newUser = await User.create({...req.body, confirmationToken: token, role: "user"}) ;

                confirmationEmail(newUser);
                return res.status(201).json({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    role: newUser.role,
                });
            }

        } catch (error) {
            if (error instanceof ValidationError) {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                }
            } else {
                console.error(error);
                return res.sendStatus(500);

            }
        }
    }
]) ;

router.patch('/confirm', async (req, res) => {
    try{
        const user = await User.findOne({
            where: {confirmationToken: req.body.token},
            paranoid: false
        }) ;

        if(!user)
            return res.status(400).json({message: "Invalid token."}) ;
        user.isVerified = true ;
        await user.save() ;
        return res.sendStatus(204) ;
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
}) ;

module.exports = router ;
