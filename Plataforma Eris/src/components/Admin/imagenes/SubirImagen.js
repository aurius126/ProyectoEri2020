import React, {Fragment, useState, useEffect} from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Imagenes from './Imagenes'
export default class App extends React.Component {

  componentDidMount () {
    const script = document.createElement("script");
    script.src = 'js/content.js';
    script.async = true;

    document.body.appendChild(script);
  }

  render(){
    return(
      <div>  
                <Imagenes/>       
</div>

    )
  }
}