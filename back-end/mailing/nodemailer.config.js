require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADRESSE,
        pass: process.env.EMAIL_MDP
    }
});

module.exports.confirmationEmail = (user) => {
    transporter.sendMail({
        from: process.env.EMAIL_ADRESSE,
        to: user.email,
        subject: 'Confirmation de votre compte',
        html: `<h1>Bonjour ${user.firstName} ${user.lastName}</h1>
        <p>Vous venez de créer un compte sur notre site. Pour confirmer votre compte, veuillez cliquer sur
        <a href="${process.env.FRONT_URL}/confirmation/${user.confirmationToken}">ce lien</a></p>`
    });
}

module.exports.askResetPassword = (user) => {
    transporter.sendMail({
        from: process.env.EMAIL_ADRESSE,
        to: user.email,
        subject: 'Changement de mot de passe',
        html: `<h1>Bonjour ${user.firstName} ${user.lastName}</h1>
        <p>Vous venez de faire une demande pour changer votre mot de passe. Pour le chancher, veuillez cliquer sur
        <a href="${process.env.FRONT_URL}/reset-password/${user.resetPasswordToken}">ce lien</a></p>`
    });
}