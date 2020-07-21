import React from "react";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import Mapa from './mapa/Mapa'
import Imagenes from './components/Admin/imagenes/Imagenes'
import Menu from './components/Admin/Menu'

import './login.css'
const CLIENT_ID = '180375458835-vvtv82k4e23biipvqlk0dn8frk82dpgp.apps.googleusercontent.com';

class App extends React.Component {

  
    constructor(props) {
      
      super(props);
      this.state = {
          userDetails: {},
        isLogined: false,
        accessToken: ''
      };
  
      this.login = this.login.bind(this);
      this.handleLoginFailure = this.handleLoginFailure.bind(this);
      this.logout = this.logout.bind(this);
      this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    login = async (response) => {
        this.setState(state => ({
          isLogined: true, }));
        var nombre= response.profileObj.name;
        var email= response.profileObj.email;
        var googleId= response.profileObj.googleId;
        const body = {nombre, email, googleId}

        const usuario = await fetch("http://localhost:5000/usuario", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

          console.log(body)
    }

     
  
    logout (response) {
      this.setState(state => ({
        isLogined: false,
        accessToken: ''
      }));
    }
  
    handleLoginFailure (response) {
      alert('Failed to log in')
    }
  
    handleLogoutFailure (response) {
      alert('Failed to log out')
    }
  
  
 
    render() {
      
      return (
      <div className="App">
        {!this.state.isLogined && (
          <section class="login-block">
    <div class="container">
	<div class="row">
		<div class="col-md-4 login-sec">
		    <h2 class="text-center">Plataforma de visualización de datos satelitales del acervo de ERIS-Chetumal</h2>
		    <form class="login-form">
  <div class="col text-center">
    <label for="exampleInputEmail1" class="text-uppercase">Accede de una manera fácil y sencilla a nuestra plataforma usando google.</label>
     <label for="exampleInputEmail1" class="text-center">Inicia sesión</label>
     <div class="text-center">
    <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={this.login}
          onFailure={this.handleLoginFailure}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
    </div>
  </div>
  <div class="form-group">

  </div>
  
  
    <div class="form-check">
    <label class="form-check-label">
     
      
    </label>

  </div>
</form>
		</div>
		<div class="col-md-8 banner-sec">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                 <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                  </ol>
            <div class="carousel-inner" role="listbox">
    <div class="carousel-item active">
      <img  class="grande" src="https://pbs.twimg.com/media/EMx7inVUcAAuX9E.jpg" alt="First slide"/>
      <div class="carousel-caption d-none d-md-block">
  </div>
    </div>
    <div class="carousel-item">
      <img  class="grande" src="https://i.stack.imgur.com/8eaH9.jpg" alt="First slide"/>
      <div class="carousel-caption d-none d-md-block">
    </div>
    </div>
    <div class="carousel-item">
      <img  class="grande" src="https://geotiffjs.github.io/images/cog-explorer.png" alt="First slide"/>
      <div class="carousel-caption d-none d-md-block">
    </div>
  </div>
            </div>	   
		    
		</div>
	</div>
</div>
</div>
</section>
        )}
        
        {this.state.isLogined && (
          <div className="userDetails-wrapper">
            <div className="details-wrapper">
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
                <GoogleLogout
            clientId={ CLIENT_ID }
            buttonText='Logout'
            onLogoutSuccess={ this.logout }
            onFailure={ this.handleLogoutFailure }
          />
                </li>
            </ul>
        </nav>
          </div>
          <Mapa/>
          </div>
        )}
      </div>
      )
    }
}

export default App;
