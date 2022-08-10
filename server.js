const express = require ("express");
const mysql = require ("mysql2");

// create connection with db
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
password :'password',
//database : 'movie'
});

// connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql connected');
});
const app = express();

//create Db
app.get('/createdb', (req, res) => {
    let sql= 'CREATE DATABASE movie';
    db.query(sql, (err, result) => {
        if(err) throw new err;
        console.log(result);
        res.send('Database created');
    })
})
 app.listen('3000', () =>{
    console.log('start port on 3000');
 });
 
