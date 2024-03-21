import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from "../src/firebase.js";
import Usuario from "./usuario.jsx";
import SelectUsuario from './usuariosDeportistas.jsx';
import '../hojas-de-estilo/deportistas.css';
import { signOut } from "firebase/auth";
import { auth } from "../src/firebase.js";

const Deportistas = () => {

  const [usuarioInfo, setUsuarioInfo] = useState({});
  const [usuarioIdSeleccionado, setUsuarioIdSeleccionado] = useState('');
  const [datos, setDatos] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false); // Nuevo estado para indicar si los datos están cargados

  useEffect(() => {
    const fetchUsuario = async () => {
      if (usuarioIdSeleccionado) {
        const docRef = doc(db, "deportistas", usuarioIdSeleccionado);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();

          setUsuarioInfo(userData);

          // Solicitudes adicionales
          let resultadosClinicos = userData.historiaclinica[0]._key.path.segments[6];
          console.log("blalba")

          let resultados = userData.resultados[0]._key.path.segments[6];

          const docRefClinicos = doc(db, "historiaclinica", resultadosClinicos);
          const docSnapClinicos = await getDoc(docRefClinicos);
          const historiaClinica = docSnapClinicos.exists() ? docSnapClinicos.data() : null;

          const docRefResultados = doc(db, "resultados", resultados);
          const docSnapResultados = await getDoc(docRefResultados);
          const resus = docSnapResultados.exists() ? docSnapResultados.data() : null;
          

          //cambio parametro para que lo coga automático
          const idPrograma=resus.idprograma.id;
          const docRefPrograma = doc(db, "programas", idPrograma);
          const docSnapPrograma = await getDoc(docRefPrograma);
          const programa = docSnapPrograma.exists() ? docSnapPrograma.data() : null;

          // Almacenar los resultados en el array datos
          setDatos([userData, historiaClinica, resus, programa]);
          setDatosCargados(true); // Establecer que los datos están cargados

          console.log(usuarioIdSeleccionado);
        } else {
          console.log("No se encontraron datos del usuario seleccionado.");
        }
      }
    };

    fetchUsuario();

  }, [usuarioIdSeleccionado]);

  //Ésta constante se activa cada vez que hay un cambio en el selector de deportistas, pasándole como parámetro el id
  //Además, modifica el valor de useState 'usuarioIdSeleccionado' y ejecuta el useEffect
  const manejarSeleccionUsuario = (nuevoId) => {
    console.log(nuevoId);
    setUsuarioIdSeleccionado(nuevoId);
  };

  const cerrarSesion = () => {
    signOut(auth).then(() => {
      console.log("Sesión cerrada con éxito");
    }).catch((error) => {
      console.error("Error al cerrar sesión", error);
    });
  };

  return (
    <main>
      <header className="cabecera">  
      <div className='seleccion'>
     <SelectUsuario deportista={manejarSeleccionUsuario} />
     </div>
      <h1>Reflejos</h1>
        <button className="cerrar" onClick={cerrarSesion}>Cerrar sesión</button>
        
       
       
      </header>
     
      <section>
        
        {/* Renderizar SelectUsuario fuera del condicional */}
       
       
        {/* Mostrar el componente Usuario solo si los datos están cargados */}
        {datosCargados && (
          usuarioIdSeleccionado != "" &&(
          <Usuario
         
            nombre={datos[0].nombre}
            apellido1={datos[0].apellido1}
            apellido2={datos[0].apellido2}
            club={datos[0].club}
            deporte={datos[0].deporte}
            fechanacimiento={datos[0].fechanacimiento.toDate().toLocaleDateString()}
            descripcion={datos[1].descripcion}
            inicio={datos[1].fechainicio.toDate().toLocaleDateString()}
            fin={datos[1].fechafin.toDate().toLocaleDateString()}
            distancia={datos[2].distanciaaldispositivo}
            fechaR={datos[2].fecha.toDate().toLocaleDateString()}
            distanciaDispositivo={datos[2].distanciaaldispositivo}
            tiempoReac={datos[2].mediatiemporeaccion}
            tiempoEjer={datos[2].tiempototalejercicio}
            tiempoEmpleado={datos[2].tiempototalempleado}
            nFallos={datos[2].numerofallos}
            pNombre={datos[3].descripcion}
            pTipo={datos[3].tipo}
            pDistancia={datos[3].distancia}
            pCiclos={datos[3].nciclos}
            pTiempoEjer={datos[3].tejercicio}
            pTiempoDesc={datos[3].tdescanso}
          />
        ))}
  
      </section>
    </main>
  );
}

export default Deportistas;
