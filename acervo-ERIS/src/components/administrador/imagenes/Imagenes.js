import React, { Component , useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import swal from 'sweetalert';
import { Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
import Alert from '@material-ui/lab/Alert';
import EDIT from './editarFoto';
//Diseño para los elementos de las pantalla
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#383838',
    color: 'White'
  }
}));


//Función principal 
export default function MiniDrawer() {
  //Usamos los estilos y los temas
  const classes = useStyles();

  //Constante para poder listar todas las fotos de la base de datos
  const [fotos, setFotos] = useState([])

  //Esta constante nos ayudara a traer las fotografias de la base de datos
  const getFotos = async ()=> {
    try {
      //Nos conectamos a nuestra base de datos por medio de la api restful y recibimos las respuestas en formato json
     const response = await fetch("http://localhost:5000/foto")
     const jsonData = await response.json();
     setFotos(jsonData);
   } catch (err) {
     console.log(err.message)
   }
 }
 
 useEffect(()=>{
   getFotos();
 },[]);

 //Aqui creamos las coolumnas de la tabla que nos servira para listar las fotografias
  const [state, setState] = React.useState({
    columns: [
      { title: 'ID', field: 'id' },
      { title: 'Imagen', field: 'imagen' },
      { title: 'Nombre', field: 'nombre' },
      { title: 'Fecha', field: 'fecha' },
      { title: 'Norte', field: 'norte' },
      { title: 'Sur', field: 'sur' },
      { title: 'Este', field: 'este' },
      { title: 'Oeste', field: 'oeste' },
      { title: 'Editar', field: 'editar' },
      { title: 'Eliminar', field: 'eliminar' },
    ]
  });

  const borrar = async (id) =>{
    const borrarFoto = await fetch(`http://localhost:5000/foto/${id}`, {
        method: "DELETE",
      });
  
      setFotos(fotos.filter(foto => foto.id !== id));
  }

  //Creamos la función que nos ayudara a eliminar fotografias 
  const borrarFoto= async (id) =>{
  
    try {
      //Nos conectamos a la ruta de nuestra API rest la cual borrara la imagen
      return(
        swal({
          title: "¿Estas seguro de borrar la imagen?",
          text: "Si la borras, ya no la podras recuperar",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            borrar(id)
            swal("Usted borro la imagen", {
              icon: "success",
            });
          } else {
            swal("La imagen no ha sido borrada");
          }
        })
      )
    } catch (err) {
      //Responder si no se logra una conexión
      console.log(err.message)
    }
  }


  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
        <MaterialTable
        // Titulo de la tabla 
      title="Fotografías"
      //Columnas de la tabla
      columns={state.columns}
      data={fotos.map(foto => (
        //recorrido de las imagenes para formar parte de la tabla
                      {
                        id: foto.id,
                        imagen: <img src={`capas/${foto.nombre}.jpg`} width="100" height="100"/>,
                        nombre: foto.nombre,  
                        fecha: foto.fecha,
                        norte: foto.norte,
                        sur: foto.sur,
                        este: foto.este,
                        oeste: foto.oeste,
                        editar: <EDIT foto={foto}/>,
                        eliminar: <button className="btn btn-danger" onClick={()=> borrarFoto(foto.id)}>Eliminar</button>
                      }
                    ))}

    />
      </main>
    </div>
  );
}