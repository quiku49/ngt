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
var hash  = crypto.createHash('sha256', "h")

export async function checkUser(user, pass) {
    const [row] = await con.query(
        'SELECT * FROM users WHERE username = ? AND password = ?;',
        [user.trim(), hash.update(pass.trim()).digest('Hex')]
    )
    if (row.length >= 1)
        return true;
    else
        return false;
}
export async function existsUser(user) {
    const [row] = await con.query(
        'SELECT * FROM users WHERE username = ?;',
        [user.trim()]
    )
    if (row.length >= 1)
        return row;
    else
        return false;
}
export async function saveUser(user, pass) {
    if(!existsUser(user))
    {
        const [row] = await con.query(
            'INSERT INTO users(username,password) VALUES (?,?);',
            [user.trim(), hash.update(pass.trim()).digest('Hex')]
        )
    }
    else
        console.log("ya existe usuario", user)
}

