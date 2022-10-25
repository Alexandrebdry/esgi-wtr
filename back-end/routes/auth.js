const {Router} = require('express') ;
const {body, validationResult} = require('express-validator');
const {User} = require('../models') ;
const bcrypt = require("bcryptjs") ;
const authMiddleware = require('../security/middleware/auth') ;

const {generateCode} = require("../services/codeGenerator");
const {ValidationError} = require("sequelize");
const {confirmationEmail, askResetPassword} = require("../mailing/nodemailer.config");
const {generateToken} = require("../security/jwt");

const router = Router() ;
let refreshTokens = [];

router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({min: 6}),
    body('firstName').isLength({min: 2}),
    body('lastName').isLength({min: 2}),
    async (req, res) => {
        try{
            const user = await User.findOne({
                    where: {email: req.body.email},
                    paranoid: true}
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
                    slug: newUser.slug
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
            paranoid: true
        }) ;

        if(!user)
            return res.status(400).json({message: "Invalid token."}) ;
        user.isVerified = true ;
        user.confirmationToken = null ;
        await user.save() ;
        return res.sendStatus(204) ;
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
}) ;

router.get('/verify', authMiddleware  , async (req,res) => {
    const user = await User.findOne({
        where: {email: req.user.email},
        paranoid: true
    });
    if(!user) return res.sendStatus(401);
    else return res.json({
        id:user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        role: user.role,
        slug: user.slug,
    });
});

router.post('/login', async (req,res) => {
    try {
        const user = await User.findOne({
            where : {email: req.body.email},
            paranoid: true
        });

        if(!user) return res.status(401).json({message: 'Identifiants non valide' }) ;
        const passwordValid = await bcrypt.compare(req.body.password, user.password) ;

        if(!passwordValid) return res.status(401).json({message: 'Identifiants non valide' }) ;
        if(!user.isVerified) return res.status(401).json({message: "Le compte n'est pas vérifié" }) ;

        const accessToken = generateToken(user) ;
        const refreshToken = generateToken(user) ;
        refreshTokens.push(refreshToken) ;

        return res.json({
            id:user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            role: user.role,
            slug: user.slug,
            accessToken,
            refreshToken
        });


    } catch(err) {
        res.sendStatus(500);
        console.error(err);
    }
}) ;

router.patch('/reset-password', async (req,res) => {
    try {
        const user = await User.findOne({
            where: {email: req.body.email},
            paranoid: true
        }) ;
        if(!user) return res.sendStatus(401) ;

        user.resetPasswordToken = generateCode();
        await user.save();

        askResetPassword(user) ;
        return res.sendStatus(204) ;


    } catch(err) {return res.sendStatus(500);}
}) ;

router.patch('/confirm-reset-password',
    body('password').isLength({min:8}),
    async (req,res) => {
        try {
            const user = await User.findOne({
                where: {resetPasswordToken: req.body.code}
            });
            if(!user) return res.sendStatus(401) ;

            user.password = req.body.password ; //await bcrypt.hash(req.body.password, await bcrypt.genSalt()) ;
            user.resetPasswordToken = null ;

            await user.save() ;
            return  res.sendStatus(204) ;

        } catch(error) {
            if (error instanceof ValidationError) {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                }

            } else {
                res.sendStatus(500);
                console.error(error);
            }
        }

}) ;

module.exports = router ;
