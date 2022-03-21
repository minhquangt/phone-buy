const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopping-cart',
    port: 3306,
});

db.connect(err => {
    if (err) {
        console.log('err: ' + err);
    } else {
        console.log('Db connect success...');
    }
});

module.exports = db;