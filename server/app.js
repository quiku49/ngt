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

app.get("/mastermind/:user", async(req, res) => {
    const log = await existsUser(req.params.user);
    res.status(200).send(log);
})
//put, delete, post
app.listen(8080, () =>{

        console.log("server running on port 8080")
    }   
);
