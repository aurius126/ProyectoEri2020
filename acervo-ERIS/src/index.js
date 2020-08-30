//Importamos los elementos que neceistaremos
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import applicationStore from "./framework/redux/ApplicationStore";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

//Creamos el tema de colores que utilizaremos para los elementos de material UI
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#383838'
    },
    secondary: {
      main: '#eb8705'
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={applicationStore}>
      <App />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();