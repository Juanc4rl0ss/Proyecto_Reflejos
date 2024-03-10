//Aquí elijes la ruta de la hoja de estilos,y con eso ya todo lo que se hace aquí, se maqueta de manera modular
import '../hojas-de-estilo/usuario.css'

const Usuario=(props)=>{
const {nombre,apellido1,apellido2,club,deporte,fechanacimiento, descripcion, ejercicio, inicio, fin}=props;

/*ésta sería otra opción
const Usuario=({nombre,apellido1,apellido2,club,deporte,fechanacimiento})=>{ 
*/
 
      return(
        <div className='container'>
          <div className='datos'>
            <h4>Nombre:&nbsp; &nbsp; <span className='estiloDatos'> {nombre} {apellido1} {apellido2}</span></h4>
            <h4>Club:&nbsp; &nbsp; <span className='estiloDatos'>{club}</span></h4>
            <h4>Deporte: &nbsp; &nbsp;<span className='estiloDatos'>{deporte}</span></h4>
          <h4>Fecha de nacimiento: &nbsp; &nbsp; <span className='estiloDatos'>{fechanacimiento}</span></h4>
          </div>
          <div className='datos'>
            <h4>Descripción: &nbsp; &nbsp; <span className='estiloDatos'>{descripcion}</span> </h4>
        <h4>Rehabilitación: <span className='estiloDatos'>{ejercicio} </span></h4>
        <ul>
            <li>Fecha de inicio: <span className='estiloDatos'>{inicio} </span> </li>
            <li>Fecha de fin: <span className='estiloDatos'>{fin} </span></li>
        </ul>
          </div>
        </div>
      )
  }
  export default Usuario;