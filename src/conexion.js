const mysql = require('mysql');


//cambiar Parametros de Conexion a la base de datos.
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'djmaster_21',
    database: 'apidb'
});

mysqlConnection.connect(function(err){
    if(err) {
        console.log(err);
        return;
    }else{
        console.log('Conexion exitosa :)');
    }
});

module.exports= mysqlConnection;