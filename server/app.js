import express from 'express'
import cors from 'cors'
import { Server as socketServer} from 'socket.io'
import http from 'http'
import TokenGenerator from 'uuid-token-generator'
import {
    checkUser,
    saveUser, 
    existsUser
} from './database.js'

const corsOptions = {
    origin: ["http://192.168.1.110:5173","http://192.168.1.135"],
    methods: ["POST", "GET"],
    credentials: true
}
var rooms = []
const app = express()

app.use(express.json())
app.use(cors())
const server = http.createServer(app)
const io = new socketServer(server, {
    cors: corsOptions
  });

app.get("/user", async(req, res) => {
    const log = await existsUser(req.query.user);
    res.status(200).send(log);
})
app.get("/login", async(req, res) => {
    if(existsUser(req.query.user))
    {
        var log = await checkUser(req.query.user, req.query.pass);
        if(log)
        {
            const token = new TokenGenerator(256, TokenGenerator.BASE62);
            
            log = {
                user: req.query.user,
                bool: log,
                token: token.generate()
            }
        }
        else{
            log = {
                bool: log
            }
        }
        res.status(200).send(log);
    }
    
})
//app.post()
app.post("/register", async (req, res) => {
    const { username, name, lastName, email, age, password } = req.body;
    const savedUser = await saveUser(username, password, email, age, lastName, name);
    res.status(200).send(savedUser);
    
});

io.on('connection', socket => {
    console.log('client connected', socket.id)
    socket.on('movement', (data) =>{
        socket.broadcast.emit('move', data)
    })
    socket.on('newRoom', (data)=>{
        let roomid = createRoom()
        let room = {
            roomid: roomid,
            player1: data,
            player2: '' 
        }
        rooms.push(room)
        socket.emit('room', roomid)
    })
    socket.on('joinRoom', (data) => {
        let room = rooms.find(room => room.roomid === data.room)
        room.player2 = data.token
        socket.emit('room', room.roomid)
        console.log(rooms)
    })
})
const createRoom = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let roomId = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        roomId += characters[randomIndex];
    }
    console.log('Generated Room ID:', roomId);
    return roomId
}

server.listen(8080, () =>{
        console.log("server running on port 8080")
    }   
);
