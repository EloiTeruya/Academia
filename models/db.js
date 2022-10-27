const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Banata@',
    database: 'academia'
});

connection.connect((error)=>{
    if(error){
        console.log(error);

    }else{
        console.log("Conection! :");
        }
});
module.exports = connection;