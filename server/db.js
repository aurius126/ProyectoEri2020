//Creamos la constante para conectarnos a la libreria de PG y realizar la conexión a la base de datos
const Pool = require("pg").Pool;

//Creamos la constante para realizar la conexión a la base de datos
const pool = new Pool({
    //Usuario para acceder a la base de datos
    user: "ERIS",
    //Contraseña para acceder a la base de datos
    password: "ERIS20",
    //Host en el que se encuentra
    host: "localhost",
    //Puerto de conexión
    port: 5432,
    //Nombre la base de datos
    database: "ERIS"
});
//Exportamos la constante
module.exports = pool;