import mysql from 'mysql2'
import dotenv from 'dotenv'
import crypto from 'crypto'


dotenv.config();

const con = mysql
.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})
.promise();

export async function checkUser(user, pass) {
    if(existsUser(user))
    {
        const hash  = crypto.createHash('sha256')
        const [row] = await con.query(
            'SELECT * FROM users WHERE username = ? AND password = ?;',
            [user.trim(), hash.update(pass.trim()).digest('Hex')]
        )
        if (row.length >= 1)
            return true;
    }
    return false;
}
export async function existsUser(user) {
    const [row] = await con.query(
        'SELECT * FROM users WHERE username = ?;',
        [user.trim()]
    )
    if (row.length >= 1)
    {
        return true;
    }
    return false;
}
export async function saveUser(user, pass, email, age, lastname, name) {
    const [total] = await con.query(
        'SELECT * FROM users;'
    )
    var id = total.length
    if(await existsUser(user) == false)
    {
        const hash  = crypto.createHash('sha256')
        const [row] = await con.query(
            'INSERT INTO users(id,username,password,name,lastname,age,email) VALUES (?,?,?,?,?,?,?);',
            [id,user.trim(), hash.update(pass.trim()).digest('Hex'), name, lastname, age, email]
        )
        console.log("creado usuario", user)
        return true
    }
    console.log("ya existe usuario", user)
    return false
}
export async function friends(user1, user2){
    if(existsUser(user1) && existsUser(user2))
    {
        const [row] = await con.query(
            'SELECT * FROM friends WHERE (user1 = ? AND user2 = ?) OR ( user1 = ? AND user2 = ?)',
            [user1.trim(), user2.trim(), user2.trim(), user1.trim()]
        )
        if(row.length >= 1)
            return true
    }
    return false
    
}
export async function makeFriends(user, friend){
    if(existsUser(user) && existsUser(friend) && friends(user, friend))
    {
        const [row] = await con.query(
            'INSERT INTO friends(user1, user2) VALUES (?,?);',
            [user.trim(), friend.trim()]
        )
        return true
    }
    return false
}