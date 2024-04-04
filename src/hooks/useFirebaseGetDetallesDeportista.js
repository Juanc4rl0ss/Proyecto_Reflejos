import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../main";

// Hook que se encarga de gestionar las llamadas para obtener los detalles de un deportista.
function useFirebaseGetDetallesDeportista(idDeportista) {
  const [detallesDeportista, setDetallesDeportista] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Funcion que obtiene los datos de Firestore de manera asincrona
  const fetchData = async (idDeportista) => {
    try {
      // Obtenemos una instancia de Firestore
      const db = getFirestore(app);
      const docDeportista = doc(db, "deportistas", idDeportista);
      const snapshotDeportista = await getDoc(docDeportista);

      let detalles = null;
      if (snapshotDeportista.exists()) {
        const userData = snapshotDeportista.data();

        // Solicitudes adicionales
        let resultadosClinicos = userData.historiaclinica[0]._key.path.segments[6];

        let resultados = userData.resultados[0]._key.path.segments[6];

        const docRefClinicos = doc(db, "historiaclinica", resultadosClinicos);
        const docSnapClinicos = await getDoc(docRefClinicos);
        const historiaClinica = docSnapClinicos.exists() ? docSnapClinicos.data() : null;

        const docRefResultados = doc(db, "resultados", resultados);
        const docSnapResultados = await getDoc(docRefResultados);
        const resultado = docSnapResultados.exists() ? docSnapResultados.data() : null;

        //cambio parametro para que lo coga automático
        const idPrograma = resultado.idprograma.id;
        const docRefPrograma = doc(db, "programas", idPrograma);
        const docSnapPrograma = await getDoc(docRefPrograma);
        const programa = docSnapPrograma.exists() ? docSnapPrograma.data() : null;

        // Almacenar los resultados en el array datos
        detalles = {
          datosPersonales: userData,
          historiaClinica: historiaClinica,
          resultados: resultado,
          programa: programa,
        };
      } else {
        console.log("No se encontraron datos del usuario seleccionado.");
      }

      setDetallesDeportista(detalles);
      setLoading(false);
      setError(false);
    } catch (e) {
      setDetallesDeportista(null);
      setLoading(false);
      setError(true);
      console.log("Error: " + e);
    }
  };

  // Solo se realiza la llamada a Firestore al montar el hook y cuando se detecta un cambio en la URL
  useEffect(() => {
    fetchData(idDeportista);
    setLoading(true);
  }, [idDeportista]);

  // Devuelve la respuesta de Firestore y el estado de la llamada
  return { detallesDeportista, loading, error };
}

export default useFirebaseGetDetallesDeportista;
