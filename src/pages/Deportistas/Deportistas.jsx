import { app } from "../../main";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getFirestore, getDoc, doc } from "firebase/firestore";
import SelectDeportistas from "../../componentes/SelectDeportistas/SelectDeportistas";
import Deportista from "../../componentes/Deportista/Deportista";
import Header from "../../componentes/Header/Header";
import "./Deportistas.css";

const Deportistas = () => {
  //Se obtiene el id del deportista pasado por parametro en la URL
  const { id } = useParams(); 
  const [usuarioIdSeleccionado, setUsuarioIdSeleccionado] = useState(id);
  const [datos, setDatos] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false); // Nuevo estado para indicar si los datos están cargados

  useEffect(() => {
    const fetchUsuario = async () => {
      // Obtenemos una instancia de Firestore
      const db = getFirestore(app);

      if (usuarioIdSeleccionado) {
        const docRef = doc(db, "deportistas", usuarioIdSeleccionado);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();

          // Solicitudes adicionales
          let resultadosClinicos =
            userData.historiaclinica[0]._key.path.segments[6];
          console.log("blalba");

          let resultados = userData.resultados[0]._key.path.segments[6];

          const docRefClinicos = doc(db, "historiaclinica", resultadosClinicos);
          const docSnapClinicos = await getDoc(docRefClinicos);
          const historiaClinica = docSnapClinicos.exists()
            ? docSnapClinicos.data()
            : null;

          const docRefResultados = doc(db, "resultados", resultados);
          const docSnapResultados = await getDoc(docRefResultados);
          const resus = docSnapResultados.exists()
            ? docSnapResultados.data()
            : null;

          //cambio parametro para que lo coga automático
          const idPrograma = resus.idprograma.id;
          const docRefPrograma = doc(db, "programas", idPrograma);
          const docSnapPrograma = await getDoc(docRefPrograma);
          const programa = docSnapPrograma.exists()
            ? docSnapPrograma.data()
            : null;

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

  return (
    <main>
       <Header/>

      <section>
        <div className="seleccion">
          <SelectDeportistas onChangeDeportista={manejarSeleccionUsuario} defaultValue={id} />
        </div>
        {datosCargados && usuarioIdSeleccionado != "" && (
          <Deportista
            nombre={datos[0].nombre}
            apellido1={datos[0].apellido1}
            apellido2={datos[0].apellido2}
            club={datos[0].club}
            deporte={datos[0].deporte}
            fechanacimiento={datos[0].fechanacimiento
              .toDate()
              .toLocaleDateString()}
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
        )}
      </section>
    </main>
  );
};

export default Deportistas;
