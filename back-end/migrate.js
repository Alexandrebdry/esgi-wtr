const {connection} = require('./models') ;

connection.sync({alter:true}).then(() => {
    console.log("The database has been synchronized successfully !");
    connection.close() ;
}).catch(() => {
    console.error("An error occurred while synchronise the database...")
});


