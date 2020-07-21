import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inicio from './inicio';
import Imagenes from './components/Admin/imagenes/SubirImagen'
import Usuarios from './components/Admin/Usuarios/Usuarios'
import Menu from './components/Admin/Menu'

export default function App() {
  return (
    <Router>
      <div> 

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/imagenes">
            <Imagen />
          </Route>
          <Route path="/usuarios">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
  <div>
  <Inicio/>
  </div>
  )
}

function Imagen() {
  return (
      <div>
      <Menu/>
      <Imagenes/>
      </div>
  )
}

function Users() {
  return (
  <div>
  <Menu/>
      <Usuarios/>
  </div>)
}
