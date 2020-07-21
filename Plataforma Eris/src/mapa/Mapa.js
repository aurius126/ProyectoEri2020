
import React, { Component , useState, useEffect} from 'react';
import {Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  ZoomControl,
  WMSTileLayer } from 'react-leaflet';

import './App.css';
const { BaseLayer, Overlay } = LayersControl

export default function Content() {
  const [tif, setTif] = useState("");
  console.log(tif);
  const [fotos, setFotos] = useState([]);
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
    <div>
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a className="brand-link">
        <span className="brand-text font-weight-light"><a href="/imagenes" class="btn btn-light" role="button" aria-pressed="true" style={{display: "block", margin: 0}}>Ingresa al menú</a></span>
        
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
              <a className="nav-link">
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
          <div class="col text-center">
          <table class="table table-sm table-dark" id="example">
                <thead>
                  <tr>
                    <th>Seleccione la capa</th>
                  </tr>
                </thead>
                <tbody>
                    {fotos.map(foto => (
                      <tr>
                      <td><button class="btn btn-light" value={tif} onClick={e => setTif(foto.nombre)}><img src={foto.ruta} width="100" height="100"/> </button> </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              </div>
        </nav>
      </div>
    </aside>
    <Map id="mapid" center={[19.4293293, -88.6620921]}
        zoom={7}
        zoomControl={false}
        >
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution= '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
          </BaseLayer>
          <Overlay checked name="Capa 1 cancun">
             <WMSTileLayer
          url="http://localhost:8080/geoserver/imagenes/wms?service=WMS"
          version='1.1.0'
          opacity={1}
          transparent
          layers= {tif}
          format= "image/png"
          srs="EPSG:3857"
         
        />
          </Overlay>
        </LayersControl>
        <ZoomControl position="topright" />
      </Map>
    </div>
  );
}

