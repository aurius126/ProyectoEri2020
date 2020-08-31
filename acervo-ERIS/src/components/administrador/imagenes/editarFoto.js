import React , { Component , useState, useEffect} from 'react';
import swal from 'sweetalert';
 const EditFoto = ({foto}) => {
    
    const [fecha, setFecha] = useState(foto.fecha);
    const [nombre, setNombre] = useState(foto.nombre);
    const [norte, setNorte] = useState(foto.norte);
    const [sur, setSur] = useState(foto.sur);
    const [este, setEste] = useState(foto.este);
    const [oeste, setOeste] = useState(foto.oeste);
  
    const onEdit = async (e) => {
        e.preventDefault()
        try {
          //Creamos las constantes que seran ingresadas a nuestra base de datos
          const body = {nombre, fecha, norte, sur, este, oeste};
          
          //Nos conectamos a la ruta de nuestra API rest la cual tendra los datos de subida
          const response = await fetch(`http://localhost:5000/foto/${foto.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
          });
          
          return(
              
            swal("Datos correctos", "Se ha modificado con exito la información", "success")
            
          )
          
        } catch (err) {
          //Responder si no se logra una conexión
          console.log(err.message)
         
        }
      };
    return(
       <div>
  <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${foto.id}`}>
    Editar
  </button>
  {/* Modal */}
  <div className="modal fade" id={`id${foto.id}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">Editar imagen</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
     

      <div className="form-row mb-4">
      <div class="col">
      <input className="form-control" type="date" name="fecha" value={fecha} onChange={e => setFecha(e.target.value)}/>
        </div>
     
     
      <div class="col">
      <input className="form-control" placeholder="Nombre" name="nombre" value={nombre} onChange={e => setNombre(e.target.value)}/>
        </div>
     
        </div>

        <div className="form-row mb-4">
      <div class="col">
      <input className="form-control" placeholder="Coordenada Norte" name="norte" value={norte} onChange={e => setNorte(e.target.value)}/>
        </div>
     

      <div class="col">
      <input className="form-control" placeholder="Coordenada Sur" name="sur" value={sur} onChange={e => setSur(e.target.value)}/> 
        </div>
        </div>
        <div className="form-row mb-4">
      <div class="col">
      <input className="form-control" placeholder="Coordenada Este" name="este" value={este} onChange={e => setEste(e.target.value)}/>
        </div>

      <div class="col">
      <input className="form-control" placeholder="Coordenada Oeste" name="oeste" value={oeste} onChange={e => setOeste(e.target.value)}/>
        </div>
        </div>
     
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => onEdit(e)}>Editar imagen</button>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default EditFoto;