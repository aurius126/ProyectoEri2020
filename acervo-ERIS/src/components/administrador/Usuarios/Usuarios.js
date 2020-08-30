import React, { Component , useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


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
 
  const [usuarios, setUsuarios] = useState([])

  //Función para obtener a los usuarios
  const getUsuarios = async () => {
   try {
      const response = await fetch("http://localhost:5000/usuario");
      const jsonData = await response.json();
      setUsuarios(jsonData);
      console.log(setUsuarios);
   } catch (err) {
      console.error(err.message)
  }      
  }

  useEffect(() => { 
      getUsuarios();
      console.log(getUsuarios);
  }, []);

 //Aqui creamos las coolumnas de la tabla que nos servira para listar las fotografias
  const [state, setState] = React.useState({
    columns: [
      { title: 'Google ID', field: 'id' },
      { title: 'Nombre', field: 'nombre' },
      { title: 'Correo', field: 'correo' },
    ]
  });

  

  return (
    <div className={classes.root}>   
      <main className={classes.content}>
        <div className={classes.toolbar} /> 
        <Card>
          {/* Tabla creada con la libreria materialTable */}
        <MaterialTable
        //Titulo de la tabla
      title="Usuarios"
      //Columnas de la tabla
      columns={state.columns}
      //Recorrido de usuarios para formar parte de la tabla
      data={usuarios.map(usuario => (
                      {
                        id: usuario.googleid,
                        nombre: usuario.email,
                        correo: usuario.nombre,
                      }
                    ))}

    />
    </Card>
      </main>   
    </div>
  );
}