const mysql = require('mysql2');

const db = mysql.createPool({
    host:'serwer2386770.home.pl',
    user:'37830094_warsztat',
    password:'HouseOfCars1234!@#$',
    database:'37830094_warsztat',
    port: 3380,
});

db.getConnection((err, con) =>{
    if (err){
        console.log(`Could not connect ${err}`);

    }else {
        console.log("Connected")
    }
});

module.exports = db;