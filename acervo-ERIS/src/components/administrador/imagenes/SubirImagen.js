import React, { Component , useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
import Alert from '@material-ui/lab/Alert';
import swal from 'sweetalert';
//Diseño para los elementos de las pantalla
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#383838',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#383838',
    color: 'White'
  },
}));


//Función principal 
export default function MiniDrawer() {
  //Usamos los estilos y los temas
  const classes = useStyles();


const { register, handleSubmit, watch, errors } = useForm();

const onSubmit = async data => {
  var nombre = data.nombre;
  var fecha = data.fecha;
  var norte = data.norte;
  var sur = data.sur;
  var este = data.este;
  var oeste = data.oeste;

  try {
    //Creamos las constantes que seran ingresadas a nuestra base de datos
    const body = {nombre, fecha, norte, sur, este, oeste};
    console.log(body)
    //Nos conectamos a la ruta de nuestra API rest la cual tendra los datos de subida
    const response = await fetch("http://localhost:5000/foto", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    });
    console.log("Fotosubida")
    return(
      swal("Datos correctos", "Imagen registrada a la base de datos", "success")
    )
  } catch (err) {
    //Responder si no se logra una conexión
    console.log(err.message)
    console.log("foto no subida")
  }

};



  return (
    <div className={classes.root}>
      
      <CssBaseline />
     
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="h4 mb-4">Ingresa una nueva imágen</p>
      <div className="form-row mb-4">
      <div class="col">
      <input className="form-control" type="date" name="fecha" ref={register({ required: true })} />
      {errors.fecha && <span>
         <br/>
         <Alert variant="outlined" severity="warning">
           <Typography color="secondary">
        La fecha es requerida
        </Typography>
        </Alert>
        
        </span>}
        </div>
     
     
      <div class="col">
      <input className="form-control" placeholder="Nombre" name="nombre" ref={register({ required: true })} />
      {errors.nombre && <span>
         <br/>
         <Alert variant="outlined" severity="warning">
           <Typography color="secondary">
        El nombre es requerido
        </Typography>
        </Alert>
        
        </span>}
        </div>
     
        </div>

        <div className="form-row mb-4">
      <div class="col">
      <input className="form-control" placeholder="Coordenada Norte" name="norte" ref={register({ required: true })} />
      {errors.norte && <span>
         <br/>
         <Alert variant="outlined" severity="warning">
           <Typography color="secondary">
        La coordenada norte es requerida
        </Typography>
        </Alert>
        
        </span>}
        </div>
     

      <div class="col">
      <input className="form-control" placeholder="Coordenada Sur" name="sur" ref={register({ required: true })} /> 
      {errors.sur && <span>
         <br/>
         <Alert variant="outlined" severity="warning">
           <Typography color="secondary">
        La coordenada sur es requerida
        </Typography>
        </Alert>
        
        </span>}
        </div>
        </div>
        <div className="form-row mb-4">
      <div class="col">
      <input className="form-control" placeholder="Coordenada Este" name="este" ref={register({ required: true })} />
      {errors.este && <span>
         <br/>
         <Alert variant="outlined" severity="warning">
           <Typography color="secondary">
        La coordenada este es requerida
        </Typography>
        </Alert>
        
        </span>}
        </div>
     

      <div class="col">
      <input className="form-control" placeholder="Coordenada Oeste" name="oeste" ref={register({ required: true })} />
      {errors.oeste && <span>
         <br/>
         <Alert variant="outlined" severity="warning">
           <Typography color="secondary">
        La coordenada oeste es requerida
        </Typography>
        </Alert>
        
        </span>}
        </div>
        </div>
      <button type="submit" class="btn btn-outline-warning btn-lg btn-block">Subir imagen</button>
    </form>  
      </main>
      
    </div>
  );
}