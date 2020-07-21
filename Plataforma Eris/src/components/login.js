import React from "react";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import Mapa from './mapa/Mapa'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userDetails: {},
      isUserLoggedIn: false
    };
  }

  responseGoogle = response => {
    this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
  };

  logout = () => {
    this.setState({isUserLoggedIn: false})
  };

  render() {
    return (
      <div className="App">
        {!this.state.isUserLoggedIn && (
          <GoogleLogin
            clientId="180375458835-vvtv82k4e23biipvqlk0dn8frk82dpgp.apps.googleusercontent.com" //TO BE CREATED
            render={renderProps => (
              <button
                className="button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Log in with Google
              </button>
            )}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        )}
        {this.state.isUserLoggedIn && (
          <div>
          <GoogleLogout
                render={renderProps => (
                  <button
                    className="logout-button"
                    onClick={renderProps.onClick}
                  >
                    Log Out
                  </button>
                )}
                onLogoutSuccess={this.logout}
              />
          <Mapa />
          </div>
        )}
      </div>
    );
  }
}

export default App;
