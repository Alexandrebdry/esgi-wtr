const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./security/middleware/auth');
const {Server} = require('socket.io');
const {Conversation, Message} = require("./models");

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

app.use('/api/auth', authRoutes);
app.use('/api', authMiddleware ,require('./routes/groups'));
app.use('/api', authMiddleware ,require('./routes/conversations'));
app.use('/api', authMiddleware, require('./routes/asks')) ;
app.use('/api', authMiddleware, require('./routes/agenda'));
app.use('/api', authMiddleware ,require('./routes/user'));
app.get('/api/messages', authMiddleware, async(req,res) => {
    try{
        const messages = await Message.findAll({
            where: {...req.query},
            paranoid: true
        });
        if(!messages) return res.sendStatus(404) ;
        res.json(messages) ;
    } catch (err) {res.sendStatus(500);console.error(err);}
}) ;

app.post('/api/messsages', authMiddleware, async(req,res) => {
    try {
        const newMessage = await Message.create({
            text: req.body.text,
            senderID: req.body.authorID,
            conversationId: req.body.conversationID
        });
            return res.status(201).json(newMessage) ;
    } catch (err) {res.sendStatus(500);console.error(err);}
}) ;

const server = app.listen(process.env.PORT,() => {
    console.log("Server is listening on port : " + process.env.PORT) ;
});

// REAL TIME
const io = new Server(server,{
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
}) ;
io.listen(3000) ;

io.on('connection', async function (socket) {

    socket.on('join-channel', async (channel) => {
        const messages = await  Message.findAll({
            where: {
                conversationId: channel.id
            }
        }) ;
        io.emit('channel-'+channel.id , messages) ;

        socket.on('send-messages-to-'+channel.id, async (message) => {
            const messages = await  Message.findAll({
                where: {
                    conversationId: channel.id
                }
            }) ;
            io.emit('read-message-from-'+channel.id, messages) ;
        }) ;

    })  ;
}) ;



