//Creamos la constante que necesitamos para realizar las consultas
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//Rutas

//Subir fotografia 
app.post("/foto", async(req, res) => {
    try {
        const {nombre, fecha, norte, sur, este, oeste} = req.body;
        const newFoto = await pool.query("INSERT INTO fotos (nombre, fecha, norte, sur, este, oeste) values($1,$2,$3,$4,$5,$6) RETURNING *", [ nombre, fecha, norte, sur, este, oeste]);
        res.json(newFoto.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Todas las fotos
app.get("/foto", async(req, res) => {
    try {
        const allFotos = await pool.query("SELECT * FROM fotos");
        res.json(allFotos.rows);
    } catch (err) {
        console.error(err.message);
    }
});



//filtrado de fotos
app.get("/foto/:fechai/:fechaf", async(req, res) => {
    try {
        const {fechai, fechaf} = req.params;
        const filtradoFotos = await pool.query("SELECT * FROM fotos where fecha between $1 and $2", [fechai, fechaf]);
        res.json(filtradoFotos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//borrar foto
app.delete("/foto/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const borrarFotos = await pool.query("DELETE FROM fotos where ID = $1", [id]);
        res.json("Se elimino la foto");
    } catch (err) {
        console.error(err.message);
    }
});

//Todas los usarios
app.get("/usuario", async(req, res) => {
    try {
        const allUsuarios = await pool.query("SELECT * FROM usuarios");
        res.json(allUsuarios.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Subir fotografia 
app.post("/usuario", async(req, res) => {
    try {
        console.log(req.body)
        const {googleid, email, nombre} = req.body;
        const nuevoUsuario = await pool.query("INSERT INTO usuarios (googleid, email, nombre) values($1, $2, $3) RETURNING *", [googleid, email, nombre]);
        res.json(nuevoUsuario.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Traer un usuario
app.get("/usuario/:googleid", async(req, res) => {
    try {
        const {googleid} = req.params;
        const usuario = await pool.query("SELECT * FROM usuarios where googleid = $1", [googleid]);
        res.json(usuario.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Escuchamos las peticiones del puerto 5000
app.listen(5000, ()=> {
    console.log("Servidor iniciado en el puerto 5000");
})