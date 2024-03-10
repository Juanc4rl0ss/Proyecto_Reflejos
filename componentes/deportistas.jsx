import { datos } from "../src/firebase.js";
import Usuario from "./usuario.jsx"

import { historiaClinica } from "../src/firebase.js";
//Aquí elijes la ruta de la hoja de estilos,y con eso ya todo lo que se hace aquí, se maqueta de manera modular
import '../hojas-de-estilo/deportistas.css'
import { signOut } from "firebase/auth";
import { auth } from"../src/firebaseConfig";



const Deportistas=()=>{
    
    

    const cerrarSesion = () => {
        signOut(auth).then(() => {
          console.log("Sesión cerrada con éxito");
        }).catch((error) => {
          console.error("Error al cerrar sesión", error);
        });
      };

    let fechaNaci=new Date(datos.fechanacimiento.seconds*1000);
    let naci=fechaNaci.toLocaleDateString();
    let fechaInicio=new Date(historiaClinica.fechainicio.seconds*1000);
    fechaInicio=fechaInicio.toLocaleDateString();
    let fechaFin=new Date(historiaClinica.fechafin.seconds*1000);
    fechaFin=fechaFin.toLocaleDateString();

    return(
        <main>
               <header className="cabecera">
                    <h1>{datos.nombre}  {datos.apellido1}  {datos.apellido2} </h1>
                   <button className="cerrar" onClick={cerrarSesion}><img src="src\assets\cerrarSesion.svg" title="cerrar sesión" alt=""/> </button>
                </header>
                   <h3>Datos</h3> 
            <section>
         
                <Usuario 
                nombre={datos.nombre} 
                apellido1={datos.apellido1} 
                apellido2={datos.apellido2}
                club={datos.club}
                deporte={datos.deporte}
                fechanacimiento={naci}
                descripcion={historiaClinica.descripcion}
                inicio={fechaInicio}
                fin={fechaFin}
                  />
            </section>
        </main>
    )
}
export default Deportistas;