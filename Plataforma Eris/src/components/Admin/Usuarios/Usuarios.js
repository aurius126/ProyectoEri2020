import React, { Fragment, useState, useEffect } from 'react'
import EditarUsuario from "./editarUsuario";



export default function ListUsuario() {

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
  }, []);
    return (
      <Fragment>
        <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Gestión de usuarios</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="/menu">Inicio</a></li>
            <li className="breadcrumb-item active">usuarios</li>
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
              <h3 className="card-title">Tabla de usuarios que tienen acceso a la aplicación.</h3>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <table id="example2" className="table table-bordered table-hover mt-5" >
                <thead>
                <tr>
                    <th>Id Google</th>
                    <th>Correo</th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map(usuario => (
                    <tr>
                        <td>{usuario.googleid}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.nombre}</td>
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
