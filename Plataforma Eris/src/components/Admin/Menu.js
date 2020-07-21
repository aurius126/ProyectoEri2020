import React from 'react'

export default function Content() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">ERIS</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item">
          <a href="/" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Mapa
            </p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/usuarios" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Usuarios
            </p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/imagenes" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Imágenes
            </p>
          </a>
        </li>
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

    )
}