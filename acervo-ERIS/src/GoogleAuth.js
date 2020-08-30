//Generamos las importaciones de los elementos que usaremos para el funcionamiento del proyecto
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import * as AuthorizationAction from "./framework/redux/module/Authorization";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Imagenes from "./components/administrador/imagenes/Imagenes";
import NuevaImagen from "./components/administrador/imagenes/SubirImagen";
import Usuarios from "./components/administrador/Usuarios/Usuarios";
import Mapa from "./components/mapa/mapa";
import "./login.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MapIcon from "@material-ui/icons/Map";
import BurstModeTwoToneIcon from "@material-ui/icons/BurstModeTwoTone";
import PeopleAltTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";
import AddPhotoAlternateTwoToneIcon from "@material-ui/icons/AddPhotoAlternateTwoTone";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";

//Creamos el estilo para los diferentes componentes
const useStyles = makeStyles((theme) => ({
  //Root es el componente que contendra todo
  root: {
    backgroundColor: "#383838",
  },
  //El estilo del menu que contendra las opciones
  menuButton: {
    marginRight: theme.spacing(1),
    backgroundColor: "#383838",
  },
  //El estilo de los tabs para el cambio de pagina
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

class LoginButton extends React.Component {
  //Creamos los props para definir el estado del usuario
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      tipo: null,
    };
  }

  //Aqui asignamos el estado del usuario
  toggleLoggedIn = (response) =>
    this.setState((state) => {
      //isLoggedIn se asigna a true para saber que esta logueado
      //Tipo se define como TRUE y FALSE dependiendo de la persona que entre, cuando es TRUE nos indica que es un administrador
      //cuando es False, nos indica que es un usuario normal
      return { isLoggedIn: !state.isLoggedIn, tipo: response };
    });

  //Esta función se activa al momento de iniciar sesion
  onSignIn = async (googleUser) => {
    //Obtenemos el usuario de google
    let user = googleUser.getBasicProfile();

    //obtenemos el token de google
    let id_token = googleUser.getAuthResponse().id_token;

    //Asignamos la información del usuario a variables

    var googleid = user.aU;
    var nombre = user.Ad;
    var email = user.bu;

    //Creamos el la constante para ingresar al usuario si no esta registrado
    const body = { nombre, email, googleid };

    //Creamos las constantes con los valores para los tipos
    var usuario1 = false;
    var admin = true;

    //Por medio del googleid realizamos la busqueda en la base de datos y verificar si existe
    const response = await fetch(`http://localhost:5000/usuario/${googleid}/`);
    const jsonData = await response.json();

    //ponemos en una variable la respuesta de la base de datos
    var id = jsonData[0];

    //Si no existe el usuario en la base de datos se registrara
    if (id == null) {
      //Creamos la consulta para la inserción a la base de datos en el puerto 5000
      const usuario = await fetch("http://localhost:5000/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      //Enviamos la variable de usuario que nos indica que un usuario normal inicio sesión
      this.toggleLoggedIn(usuario1);
    } else {
      if (jsonData[0].tipo == "Administrador") {
        //Enviamos la variable de admin que nos indica que un administrador inicio sesión
        this.toggleLoggedIn(admin);
      } else {
        //Enviamos la variable de usuario que nos indica que un usuario normal inicio sesión
        this.toggleLoggedIn(usuario1);
      }
    }
  };

  //La opción para renderizar el boton de google para el inicio de sesión
  renderGoogleLoginButton = () => {
    window.gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: 250,
      height: 40,
      longtitle: true,
      theme: "light",
      onsuccess: this.onSignIn,
    });
  };

  //Creamos la función para salir de la sesión
  logout = () => {
    console.log("in logout");

    let auth2 = window.gapi && window.gapi.auth2.getAuthInstance();
    if (auth2) {
      auth2
        .signOut()
        .then(() => {
          this.toggleLoggedIn();
        })
        .catch((err) => {
        });
    } else {}
  };

  //Al momento de entrar a la aplicación se despliega el boton de inicio
  componentDidMount() {
    window.addEventListener("google-loaded", this.renderGoogleLoginButton);
    window.gapi && this.renderGoogleLoginButton();
  }

  render() {
    const tipo = this.state.tipo;
    return (
      <div>
        {!this.state.isLoggedIn && (
          <div className="App">
            <section class="login-block">
              <div class="container">
                <div class="row">
                  <div class="col-md-4 login-sec">
                    <h2 class="text-center">
                      Plataforma de visualización de datos satelitales del
                      acervo de ERIS-Chetumal
                    </h2>

                    <div class="col text-center">
                      <label for="exampleInputEmail1" class="text-uppercase">
                        Accede de una manera fácil y sencilla a nuestra
                        plataforma usando google.
                      </label>
                      <label for="exampleInputEmail1" class="text-center">
                        Inicia sesión
                      </label>
                      <div class="text-center">
                        <button className="inicio" id="my-signin2" />
                      </div>
                    </div>
                    <div class="form-group"></div>

                    <div class="form-check">
                      <label class="form-check-label"></label>
                    </div>
                  </div>
                  <div class="col-md-8 banner-sec">
                    <div
                      id="carouselExampleIndicators"
                      class="carousel slide"
                      data-ride="carousel"
                    >
                      <ol class="carousel-indicators">
                        <li
                          data-target="#carouselExampleIndicators"
                          data-slide-to="0"
                          class="active"
                        ></li>
                        <li
                          data-target="#carouselExampleIndicators"
                          data-slide-to="1"
                        ></li>
                        <li
                          data-target="#carouselExampleIndicators"
                          data-slide-to="2"
                        ></li>
                      </ol>
                      <div class="carousel-inner" role="listbox">
                        <div class="carousel-item active">
                          <img
                            class="grande"
                            src="https://pbs.twimg.com/media/EMx7inVUcAAuX9E.jpg"
                            alt="First slide"
                          />
                          <div class="carousel-caption d-none d-md-block"></div>
                        </div>
                        <div class="carousel-item">
                          <img
                            class="grande"
                            src="https://i.stack.imgur.com/8eaH9.jpg"
                            alt="First slide"
                          />
                          <div class="carousel-caption d-none d-md-block"></div>
                        </div>
                        <div class="carousel-item">
                          <img
                            class="grande"
                            src="https://geotiffjs.github.io/images/cog-explorer.png"
                            alt="First slide"
                          />
                          <div class="carousel-caption d-none d-md-block"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
        {this.state.isLoggedIn && (
          <div className={useStyles.root}>
            {tipo && (
              <div>
                <AppBar position="static" color="primary">
                  <Toolbar>
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <Button aria-controls="simple-menu" aria-haspopup="true">
                        <IconButton
                          color="secondary"
                          aria-label="open drawer"
                          edge="start"
                        >
                          <MenuIcon />
                        </IconButton>
                      </Button>
                    </a>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <div
                        class="nav nav-tabs nav-fill"
                        id="nav-tab"
                        role="tablist"
                      >
                        <ul class="list-group">
                          <li class="list-group-item">
                            <div
                              class="nav-item nav-link active"
                              id="nav-mapa-tab"
                              data-toggle="tab"
                              href="#nav-mapa"
                              role="tab"
                              aria-controls="nav-mapa"
                              aria-selected="true"
                            >
                              <Tab
                                label={
                                  <ListItem button>
                                    <ListItemIcon>
                                      <MapIcon color="secondary" />
                                    </ListItemIcon>
                                    <ListItemText primary="Mapa" />
                                  </ListItem>
                                }
                              />
                            </div>
                          </li>
                          <li class="list-group-item">
                            <div
                              class="nav-item nav-link"
                              id="nav-profile-tab"
                              data-toggle="tab"
                              href="#nav-profile"
                              role="tab"
                              aria-controls="nav-profile"
                              aria-selected="false"
                            >
                              <Tab
                                label={
                                  <ListItem button>
                                    <ListItemIcon>
                                      <BurstModeTwoToneIcon color="secondary" />
                                    </ListItemIcon>
                                    <ListItemText primary="Imagenes" />
                                  </ListItem>
                                }
                              />
                            </div>
                          </li>
                          <li class="list-group-item">
                            <div
                              class="nav-item nav-link"
                              id="nav-contact-tab"
                              data-toggle="tab"
                              href="#nav-contact"
                              role="tab"
                              aria-controls="nav-contact"
                              aria-selected="false"
                            >
                              <Tab
                                label={
                                  <ListItem button>
                                    <ListItemIcon>
                                      <PeopleAltTwoToneIcon color="secondary" />
                                    </ListItemIcon>
                                    <ListItemText primary="Usuarios" />
                                  </ListItem>
                                }
                              />
                            </div>
                          </li>
                          <li class="list-group-item">
                            <div
                              class="nav-item nav-link"
                              id="nav-about-tab"
                              data-toggle="tab"
                              href="#nav-about"
                              role="tab"
                              aria-controls="nav-about"
                              aria-selected="false"
                            >
                              <Tab
                                label={
                                  <ListItem button>
                                    <ListItemIcon>
                                      <AddPhotoAlternateTwoToneIcon color="secondary" />
                                    </ListItemIcon>
                                    <ListItemText primary="Agregar imagen" />
                                  </ListItem>
                                }
                              />
                            </div>
                          </li>

                          <li class="list-group-item">
                            <div class="nav-item nav-link">
                              <Tab
                                label={
                                  <ListItem button>
                                    <ListItemIcon>
                                      <ExitToAppTwoToneIcon color="secondary" />
                                    </ListItemIcon>
                                    <ListItemText primary="Salir" />
                                  </ListItem>
                                }
                                onClick={this.logout}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Typography variant="h6">
                      Plataforma de visualización de datos satelitales del
                      acervo de ERIS-Chetumal {tipo}
                    </Typography>
                  </Toolbar>
                </AppBar>
                <div>
                  <div
                    class="tab-content py-0 px-0 px-sm-0"
                    id="nav-tabContent"
                  >
                    <div
                      class="tab-pane fade show active"
                      id="nav-mapa"
                      role="tabpanel"
                      aria-labelledby="nav-mapa-tab"
                    >
                      <Mapa />
                    </div>
                    <div
                      class="tab-pane fade"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <Imagenes />
                    </div>
                    <div
                      class="tab-pane fade"
                      id="nav-contact"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab"
                    >
                      <Usuarios />
                    </div>
                    <div
                      class="tab-pane fade"
                      id="nav-about"
                      role="tabpanel"
                      aria-labelledby="nav-about-tab"
                    >
                      <NuevaImagen />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!tipo && (
              <div>
                <div>
                  <AppBar position="static" color="primary">
                    <Toolbar>
                      <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <Button
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                        >
                          <IconButton
                            color="secondary"
                            aria-label="open drawer"
                            edge="start"
                          >
                            <MenuIcon />
                          </IconButton>
                        </Button>
                      </a>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <div
                          class="nav nav-tabs nav-fill"
                          id="nav-tab"
                          role="tablist"
                        >
                          <ul class="list-group">
                            <li class="list-group-item">
                              <div class="nav-item nav-link">
                                <Tab
                                  label={
                                    <ListItem button>
                                      <ListItemIcon>
                                        <ExitToAppTwoToneIcon color="secondary" />
                                      </ListItemIcon>
                                      <ListItemText primary="Salir" />
                                    </ListItem>
                                  }
                                  onClick={this.logout}
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <Typography variant="h6">
                        Plataforma de visualización de datos satelitales del
                        acervo de ERIS-Chetumal {tipo}
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <div>
                    <Mapa />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default LoginButton;
