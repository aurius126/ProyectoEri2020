import React, { Fragment, useState, useEffect } from 'react'
export default function Content() {

//Constantes para ingresar una nueva imagen
const [ruta, setRuta] = useState("");
const [ nombre, setNombre] = useState("");

//Constante para poder listar todas las fotos de la base de datos
const [fotos, setFotos] = useState([]);


//Función para subir subir una imagen
const subirFoto = async (e) => {
  e.preventDefault()
  try {
    //Creamos las constantes que seran ingresadas a nuestra base de datos
    const body = {ruta, nombre};
    //Nos conectamos a la ruta de nuestra API rest la cual tendra los datos de subida
    const response = await fetch("http://localhost:5000/foto", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    });
  window.location = "/imagenes"
  } catch (err) {
    //Responder si no se logra una conexión
    console.log(err.message)
  }
}

//Creamos la funcion que obtendra las fotos de nuestra base de datos
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

const borrarFoto= async (id) =>{
  try {
    //Nos conectamos a la ruta de nuestra API rest la cual borrara la imagen
    const borrarFoto = await fetch(`http://localhost:5000/foto/${id}`, {
      method: "DELETE",
    });

    setFotos(fotos.filter(foto => foto.id !== id));
  } catch (err) {
    //Responder si no se logra una conexión
    console.log(err.message)
  }
}
    return (
      <Fragment>
        <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Gestión de imágenes</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="/menu">Inicio</a></li>
            <li className="breadcrumb-item active">Imágenes</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">

            {/*Creamos el formulario para la subida de fotografias*/}
              <form class="form-inline" onSubmit={subirFoto}>
               <div class="form-group mb-2">
    <label for="staticEmail2" class="sr-only">TIF</label>
    <input type="file" name="imagensubida" accept="image/png, .jpeg, .jpg" class="form-control-file" value={ruta} onChange={e => setRuta(e.target.value)}/>
  </div>
  <div class="form-group mx-sm-3 mb-2">
    <label for="nombre" class="sr-only">Nombre</label>
    <input type="text" class="form-control" id="nombre" placeholder="Nombre de la foto" value={nombre} onChange={e => setNombre(e.target.value)}/>
  </div>
  <button type="submit" class="btn btn-primary mb-2">Ingresar nueva imagen</button>
              </form>

            </div>
            {/*Creamos la tabla donde se van a mapear nuestras imagenes obtenidas de la base*/}
            <div className="card-body">
<table id="example1" className="table table-bordered table-striped">
                  <thead>
                    <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fotos.map(foto => (
                      <tr key={foto.id}>
                      <td><img src={foto.ruta} width="100" height="100"/></td>
                      <td>{foto.nombre}</td>
                       <td><button className="btn btn-danger" onClick={()=> borrarFoto(foto.id)}>Eliminar</button></td>
                      </tr>
                    ))}
                </tbody>
                </table>
</div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>
        {/* /.col */}
      </div>
      {/* /.row */}
    </div>
    {/* /.container-fluid */}
  </section>
  {/* /.content */}
</div>
</Fragment>
    )
}
