import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { app } from "../main";

function useFirebaseDeportes() {
  const [deportesUnicos, setDeportesUnicos] = useState([]);

  let deportes = [];
  const dataDeporte = async () => {
    try {
      const db = getFirestore(app);

      const colDeportistas = query(
        collection(db, "deportistas"),
        where("deporte", "!=", "")
      );
      const querySnapshot = await getDocs(colDeportistas);

      /* Itera sobre los documentos (si es necesario), añade deportes array deportes, a este se la hace new Set para quitar duplicados
      y de ahí se modifica el useState*/
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        deportes.push(data.deporte);
      });
      deportes = [...new Set(deportes)];

      setDeportesUnicos(deportes);
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  // Llama a dataDeporte cuando el componente se monta
  useEffect(() => {
    dataDeporte();
  }, []);

  return { deportesUnicos };
}

export default useFirebaseDeportes;
