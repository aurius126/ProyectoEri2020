import React, { Fragment, useState, useEffect } from 'react'
import "./rSlider.min.css";

export default function Content() {
  const [tif, setTif] = useState("");
  const [fotos, setFotos] = useState([]);
  console.log(tif);
  const getFotos = async ()=> {
   try {
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
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="#" className="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">ERIS</span>
      </a>

      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-copy" />
                <p>
                  Fechas
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <input id="date1" type="date" class="fecha" />
                </li>
                <p />
                <li className="nav-item">
                  <input id="date2" type="date" class="fecha" />
                </li>
              </ul>
            </li>
          </ul>
          <table id="example2" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                    {fotos.map(foto => (
                      <tr>
                      <td>{foto.nombre}</td>
                      <td><button class="btn btn-primary mb-2" value={tif} onClick={e => setTif(foto.nombre)}>Localizar</button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
        </nav>
      </div>
    </aside>
  );
}
