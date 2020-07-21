import React from 'react'

export default function Content() {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <h5  className="nav-link">Plataforma de visualización de datos satelitales del acervo de ERIS-Chetumal</h5>
                </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                <a href="/imagenes" class="btn btn-secondary btn-sm" role="button" aria-pressed="true">Menú</a>
                </li>
            </ul>
        </nav>

    )
}