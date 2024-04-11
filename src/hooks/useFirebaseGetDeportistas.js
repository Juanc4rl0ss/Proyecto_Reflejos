import { useState, useEffect } from "react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { app } from "../main";

// Hook que se encarga de gestionar las llamadas a la coleccion deportistas de Firestore.
function useFirebaseGetDeportistas(filtros) {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Funcion que obtiene los datos de Firestore de manera asincrona
  const fetchData = async (filtros) => {
    try {
      // Obtenemos una instancia de Firestore
      const db = getFirestore(app);
      const colDeportistas = collection(db, "deportistas");
      const colDeportistasFiltrados = query(colDeportistas, ...filtros);
      const docDeportistas = await getDocs(colDeportistasFiltrados);

      let listDeportistas = [];
      docDeportistas.forEach((docDeportista) => {
        const deportista = {};
        deportista.id = docDeportista.id;
        deportista.nombre = docDeportista.data().nombre;
        deportista.apellido1 = docDeportista.data().apellido1;
        deportista.apellido2 = docDeportista.data().apellido2;
        deportista.deporte = docDeportista.data().deporte;
        listDeportistas.push(deportista);
      });
      setList(listDeportistas);
      
      setLoading(false);
      setError(false);
    } catch (e) {
      setList(null);
      setError(true);
      setLoading(false);
      console.log("Error: " + e);
    }
  };

  // Solo se realiza la llamada a Firestore al montar el hook y cuando se detecta un cambio en la URL
  useEffect(() => {
    fetchData(filtros);
    setLoading(true);
  }, [filtros]);

  // Devuelve la respuesta de Firestore y el estado de la llamada
  return { list, loading, error };
}

export default useFirebaseGetDeportistas;
