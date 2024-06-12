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
    if(await existsUser(user))
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

    if(await existsUser(user) == false)
    {
        const hash  = crypto.createHash('sha256')
        const [row] = await con.query(
            'INSERT INTO users(username,password,name,lastname,age,email) VALUES (?,?,?,?,?,?);',
            [user.trim(), hash.update(pass.trim()).digest('Hex'), name, lastname, age, email]
        )
        console.log("creado usuario", user)
        return true
    }
    console.log("ya existe usuario", user)
    return false
}
export async function friends(user, friend){
    if(await existsUser(user))
    {
        const [row] = await con.query(
            'SELECT * FROM friends WHERE user = ? and friend = ?;',
            [user.trim(), friend.trim()]
        )
        if(row.length >= 1)
            return true
    }
    return false
    
}
export async function getFriends(user){
    if(existsUser(user))
    {
        const [row] = await con.query(
            'SELECT friend FROM friends WHERE (user = ?);',
            [user.trim()]
        )
        if(row.length >= 1)
            return row
    }
    return []
    
}
export async function makeFriends(user, friend){
    if(await existsUser(user) && await existsUser(friend) && await friends(user, friend) == false)
    {
        try {
            const [row] = await con.query(
                'INSERT INTO friends(user, friend) VALUES (?,?);',
                [user.trim(), friend.trim(), 1]
            )
            const [row2] = await con.query(
                'INSERT INTO friends(user, friend) VALUES (?,?);',
                [friend.trim(), user.trim(), 1]
            )
        } catch (error) {
            console.log(error)
            return false
        }
        return true
    }
    console.log("no se pudo hacer amigo")
    return false
}
export async function deleteFriends(user, friend){
    if(await existsUser(user) && await existsUser(friend) && await friends(user, friend))
    {
        try {
            const [row] = await con.query(
                'DELETE FROM friends WHERE user=? AND friend=?;',
                [user.trim(), friend.trim(), 1]
            )
            const [row2] = await con.query(
                'DELETE FROM friends WHERE user=? AND friend=?;',
                [friend.trim(), user.trim(), 1]
            )
        } catch (error) {
            console.log(error)
            return false
        }
        return true
    }
    console.log("no se pudo eliminar amigo")
    return false
}