import React,{Fragment, useState} from 'react';

const EditarUsuario = ({usuario}) => {

    const[correo, setCorreo] = useState(usuario.correo);
    const[contraseña, setContraseña] = useState(usuario.contraseña);
    const[nombre, setNombre] = useState(usuario.nombre);

    const actualizarUsuario = async e =>{
        e.preventDefault();
        try {
            const body = {correo, contraseña, nombre};
            const response =  await fetch(`http://localhost:5000/usuarios/${usuario.usuario_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/usuarios";
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
<button type="button" class="btn btn-success btn-sm btn-block" data-toggle="modal" data-target={`#id${usuario.usuario_id}`}>
  Editar
</button>

<div class="modal" id={`id${usuario.usuario_id}`}>
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Información del usuario</h4>
        <button type="button" class="close" data-dismiss="modal" onClick={() => (setCorreo(usuario.correo), setContraseña(usuario.contraseña), setNombre(usuario.nombre))}>&times;</button>
      </div>

      <div class="modal-body">
        <input type="text" className = "form-control" placeholder="Correo" value = {correo} onChange = {e => setCorreo(e.target.value)}/>
        <hr/>
        <input type="text" className = "form-control" placeholder="Contraseña" value = {contraseña} onChange = {e => setContraseña(e.target.value)}/>
        <hr/>
        <input type="text" className = "form-control" placeholder="Nombre" value = {nombre} onChange = {e => setNombre(e.target.value)}/>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" onClick = {e => actualizarUsuario(e)}>Editar</button>

        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => (setCorreo(usuario.correo), setContraseña(usuario.contraseña), setNombre(usuario.nombre))}>Close</button>
      </div>

    </div>
  </div>
</div>
        </Fragment>
    );
}

export default EditarUsuario;