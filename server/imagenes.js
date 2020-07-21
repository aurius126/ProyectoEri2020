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
        const {ruta, nombre} = req.body;
        const newFoto = await pool.query("INSERT INTO fotos (ruta, nombre) values($1,$2) RETURNING *", [ruta, nombre]);
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

//una foto
app.get("/foto/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const unaFotos = await pool.query("SELECT * FROM fotos where ID = $1", [id]);
        res.json(unaFotos.rows[0]);
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
app.listen(5000, ()=> {
    console.log("Servidor iniciado en el puerto 5000");
})