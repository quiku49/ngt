import express from 'express'
import cors from 'cors'
import {
    checkUser,
    saveUser, 
    existsUser
} from './database.js'

const corsOptions = {
    origin: "http://127.0.0.1:3000",
    methods: ["POST", "GET"],
    credentials: true
}

const app = express()

app.use(express.json())
app.use(cors())

app.get("/user", async(req, res) => {
    const log = await existsUser(req.query.user);
    res.status(200).send(log);
})
app.get("/login", async(req, res) => {
    if(existsUser(req.query.user))
    {
        const log = await checkUser(req.query.user, req.query.pass);
        res.status(200).send(log);
    }
    
})
//app.post()
app.post("/register", async (req, res) => {
    const { username, name, lastName, email, age, password } = req.body;
    const savedUser = await saveUser(username, password, email, age, lastName, name);
    res.status(200).send(savedUser);
    
});
//put, delete, post
app.listen(8080, () =>{

        console.log("server running on port 8080")
    }   
);
