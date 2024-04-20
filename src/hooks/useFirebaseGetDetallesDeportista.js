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
 
    
        // Recuperamos toda la información de las historias clínicas
        const historiasClinicasPromesas = userData.historiaclinica.map(async ref => {
          const refDoc = ref._key.path.segments[6]; 
          const docRefClinicos = doc(db, "historiaclinica", refDoc);
          const docSnapClinicos = await getDoc(docRefClinicos);
      
          return docSnapClinicos.exists() ? docSnapClinicos.data() : null;
        });

        const resultadosPromesas = userData.resultados.map(async ref => {
          const refDoc = ref._key.path.segments[6]; 
          
          const docRefresultados = doc(db, "resultados", refDoc);
          const docSnapResultados = await getDoc(docRefresultados);
         
          return docSnapResultados.exists() ? docSnapResultados : null;
        });

        // Resuelve todas las promesas y filtra los posibles valores nulos
        const historiasClinicas = await Promise.all(historiasClinicasPromesas);
        const historiasClinicasFiltradas = historiasClinicas.filter(hc => hc !== null);
     
        const resultados = await Promise.all(resultadosPromesas)
        const resultadosFiltrados = resultados.filter(res => res !== null);
    

        let datosResultados = [] 
        for (let i = 0; i < resultadosFiltrados.length; i++){
          // Para cada resultado obtenemos el nombre del programa
          const idPrograma = resultadosFiltrados[i].data().idprograma.id
          const docRefPrograma = doc(db, "programas", idPrograma);
          const docSnapPrograma = await getDoc(docRefPrograma);
          const programa = docSnapPrograma.exists() ? docSnapPrograma.data() : null;
       
          // Para cada resultado obtenemos el nombre de la categoria
          const idTipo=resultadosFiltrados[i].data().tipoejercicio.id;
          const docRefTipo=doc(db, "categorias", idTipo);
          const docSnapTipo=await getDoc(docRefTipo);
          const tipo=docSnapTipo.exists() ? docSnapTipo.data() : null;
          const keysTipo=Object.keys(tipo)[0];
          const datosResultado = {
            idResultado: resultadosFiltrados[i].id,
            programa: programa,
            fecha: resultadosFiltrados[i].data().fecha,
            categoria: keysTipo,
            dispositivosApagados: resultadosFiltrados[i].data().numerodispositivosapagados,
            numeroFallos: resultadosFiltrados[i].data().numerofallos
          }

          datosResultados.push(datosResultado);
        
        }

        detalles = {
          datosPersonales: userData,
          historiasClinicas: historiasClinicasFiltradas,
          resultados: datosResultados,
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
