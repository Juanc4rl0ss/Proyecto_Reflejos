import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../main";

// Hook que se encarga de gestionar las llamadas a la coleccion deportistas de Firestore.
function useFirebaseGetResultados(idResultado) {
  const [datosResultado, setDatosResultado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Funcion que obtiene los datos de Firestore de manera asincrona
  const fetchData = async (idResultado) => {
    try {
      // Obtenemos una instancia de Firestore
      const db = getFirestore(app);
      const docResultado = doc(db, "resultados", idResultado);
      const snapshotResultado = await getDoc(docResultado);
      if (snapshotResultado.exists()) {
        setDatosResultado(snapshotResultado.data());
        setLoading(false);
        setError(false);
      }
    } catch (e) {
      setDatosResultado(null);
      setError(true);
      setLoading(false);
      console.log("Error: " + e);
    }
  };

  // Solo se realiza la llamada a Firestore al montar el hook y cuando se detecta un cambio en la URL
  useEffect(() => {
    fetchData(idResultado);
    setLoading(true);
  }, [idResultado]);

  // Devuelve la respuesta de Firestore y el estado de la llamada
  return { datosResultado, loading, error };
}

export default useFirebaseGetResultados;
