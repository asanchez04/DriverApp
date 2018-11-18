const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'password',
    database: 'motoapp',
    multipleStatements: true
});

mysqlConnection.connect(function (err){
    
    if(err) {
        console.log(err);
        return;
    } else {
        console.log('DB is connected');
    }
});

module.exports = mysqlConnection;