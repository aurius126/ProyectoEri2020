import React,{Fragment, useState} from 'react';

const InputUsuario = () => {

    const[correo, setCorreo] = useState("");
    const[password, setPassword] = useState("");
    const[username, setUsername] = useState("");

    const onSubmitForm = async e =>{
        e.preventDefault();
        try {
            const body = {correo, password, username};
            const response =  await fetch("http://localhost:5000/usuarios", {
                method: "POST",
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
        <h1 className = "texte-center mt-5">Lista de usuarios</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input type="text" className = "form-control" placeholder="Correo" value={correo} onChange = {e => setCorreo(e.target.value)}/>
            <input type="text" className = "form-control" placeholder="Contraseña" value={password} onChange = {e => setPassword(e.target.value)}/>
            <input type="text" className = "form-control" placeholder="Nombre" value={username} onChange = {e => setUsername(e.target.value)}/>
            <button className="btn btn-succes">Add</button>
        </form>
    </Fragment>
    )
}

export default InputUsuario;