const Sequelize = require("sequelize") ;
require('dotenv').config();

const connection = new Sequelize(process.env.DATABASE_URL, {
    useNewUrlParser:true
}) ;

connection.authenticate().then(() => {
    console.log("Connection has been authenticate successfully.");
}).catch((err) => {
    console.error("Unable to connect to the database:", err);
});

module.exports = connection ;