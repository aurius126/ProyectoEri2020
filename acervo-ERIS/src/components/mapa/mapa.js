import React, { useRef, useState, useEffect } from "react";
import { Map, Marker, TileLayer, WMSTileLayer } from "react-leaflet";
import L from "leaflet";
import useSupercluster from "use-supercluster";
import "./mapa.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useForm } from "react-hook-form";
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#383838",
  },
 
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#383838",
    padding: theme.spacing(3)
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#383838",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    backgroundColor: "#383838",
  },

  content: {
    flexGrow: 1,
    backgroundColor: "#383838",
    color: "White",
  },
  MapIcon: {
    Color: "#bf360c"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    backgroundColor: "#383838",
  },
  Typography: {
    color:"white"
  }
}));

const cuffs = new L.divIcon({
  html: `<button class="cluster-marker" style="width: 50px; height: 50px;">
    1
  </button>`
});

const icons = {};
const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<button class="cluster-marker" style="width: 50px; height: 50px;">
        ${count}
      </button>`
    });
  }
  return icons[count];
};



export default function PermanentDrawerRight() {
  const classes = useStyles();

  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(13);
  const [fotos, setFotos] = useState([]);
  
  const mapRef = useRef();
  
  
  function updateMap() {
    const b = mapRef.current.leafletElement.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat
    ]);
    setZoom(mapRef.current.leafletElement.getZoom());
  }

  React.useEffect(() => {
    updateMap();
  }, []);

  //Esta constante nos ayudara a traer las fotografias de la base de datos
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async data => {
    console.log(data.example)
    var fechai = data.example;
    var fechaf = data.exampleRequired;
    const response = await fetch(`http://localhost:5000/foto/${fechai}/${fechaf}`);
    const jsonData = await response.json(); 
    setFotos(jsonData);
    console.log(jsonData)
  };







  const points = fotos.map(foto => ({
    "type": "Feature",
    "properties": { cluster: false, fotoId: foto.id, category: foto.nombre },
    "geometry": {
      "type": "Point",
      "coordinates": [
        parseFloat(foto.oeste),
        parseFloat(foto.sur)
      ]
    }
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 17 }
  });

  function td(foto) { 
    console.log(parseFloat(selectImage.geometry.coordinates[1]).toFixed(0))
     if(parseFloat(foto.oeste).toFixed(0) == parseFloat(selectImage.geometry.coordinates[0]).toFixed(0)){
       if(parseFloat(foto.sur).toFixed(0) == parseFloat(selectImage.geometry.coordinates[1]).toFixed(0)){
       return <tr><td><Button value={tif} onClick={e => setTif(foto.nombre) } variant="outlined" color="secondary"><img src={`capas/${foto.nombre}.jpg`} height="100" width="100"/></Button></td><td><a href={`capas/${foto.nombre}.zip`}><button className="btn btn-secondary">Descargar</button></a><br/><br/><div><font color="white">Fecha:</font></div><div><font color="white">{foto.fecha}</font></div></td></tr>
       }
      }
  }

  const [tif, setTif] = useState("");
  const [selectImage, setSelectImage] = useState(null);
  const [fechai, setfechai] = useState("");
  const [fechaf, setfechaf] = useState("");

  


  return (
    <div className={classes.root}>
      <main className={classes.content}>
        {/* creamos el mapa por medio de la etiqueta Map que nos ofrece Leaflet */}
        <Map
      center={[19.4293293, -88.6620921]}
      zoom={7}
      onMoveEnd={updateMap}
      ref={mapRef}
      minZoom={7}
    >
      {/* ponemos como base el mapa principal */}
      <TileLayer
       attribution= '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
       url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />

      {/* Hacemos el recorrido del cluster */}
      {clusters.map(cluster => {
        {/* Seleccionamos la latitud y la longitud de cada punto para poner un marcador */}
        const [longitude, latitude] = cluster.geometry.coordinates;
      
        const {
          cluster: isCluster,
          point_count: pointCount
        } = cluster.properties;

        {/* se realiza la comparación para saber si es o no un cluster */}
        if (isCluster) {
           {/* si existen varios puntos en un mismo lugar se pone un cluster para agrupar los marcadores*/}
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              onClick={
                (e)=>setSelectImage(cluster)
              }
            />
          );
        }

        {/* si no es un cluster, ponemos un marcador por solitario */}
        return (
          <Marker
            key={`crime-${cluster.properties.fotoId}`}
            position={[latitude, longitude]}
            icon={cuffs}
            onclick={(e)=>
              setSelectImage(cluster)
            }
          />
        );
      })}

{/* se realiza la conexión con Geoserver y el nombre de la imagen que se escoge */}
<WMSTileLayer
          url="http://localhost:8080/geoserver/imagenes/wms?service=WMS"
          version='1.1.0'
          opacity={1}
          transparent
          layers= {tif}
          format= "image/png"
          srs="EPSG:3857"
         
        />
        {/* se cierra el mapa */}
    </Map>
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
        
      >
<Divider/>
<Typography variant="h6" className={classes.Typography}>Seleccione un intervalo</Typography>

  <form onChange={handleSubmit(onSubmit)}>     
  <Divider/>
  <Divider/>
  {/* Inputs para decidir el intervalo de fechas para ver fotografias */}      
  <ButtonGroup color="secondary" aria-label="outlined secondary button group">

    
      <input type="date" name="example" className="input-date" ref={register} />
      <input type="date" name="exampleRequired" className="input-date" ref={register({ required: true })} />   

                
                </ButtonGroup>
              </form>
 
  {selectImage ? (
    
                <div>
      <br/>
      {/* se crea una tabla para listar fotografias */}
      <table class="table">
      <thead>
      </thead>
      <tbody>
        {/* se listan las imagenes de la base de datos en una tabla */}       
      {fotos.map((foto) => (
        td(foto)  
      ))}
      </tbody>
    </table>
    </div>
    ) : null}

        <div className={classes.toolbar} />
        
      </Drawer>
    </div>
  );
}