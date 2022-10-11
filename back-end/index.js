const express = require('express');
const cors = require('cors');

const app = express();
const whitelist = ['http://localhost:3000'] ;
const corsOption = {
    origin: (origin, callback) => {
        if(!origin || whitelist.indexOf(origin) !== -1)
            callback(null,true) ;
        else callback(new Error("Not allowed by CORS policy.")) ;
    },
    credentials: true
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    return res.send('Hello World!');
});

app.listen(process.env.PORT,() => {
    console.log("Server is listening on port : " + process.env.PORT) ;
});