import { app } from "../../main";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./SelectDeportistas.css";

const SelectDeportistas = ({ onChangeDeportista, defaultValue }) => {
  const [deportistas, setDeportistas] = useState([]);
  useEffect(() => {
    // Obtenemos una instancia de Firestore
    const db = getFirestore(app);
    
    // Función asincrónica para obtener la lista de deportistas
    async function getDeportistas() {
      const colDeportistas = collection(db, "deportistas");
      const docDeportistas = await getDocs(colDeportistas);

      let list = [];

      docDeportistas.forEach((docDeportista) => {
        console.log(docDeportista.id);
        const deportista = {};
        deportista.id = docDeportista.id;
        deportista.nombre = docDeportista.data().nombre;
        deportista.apellido = docDeportista.data().apellido1;
        list.push(deportista);
      });

      return list;
    }

    // Llamar a la función para obtener las opciones del combo
    getDeportistas().then((list) => {
      setDeportistas(list);
    });
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <div className="inputUsuarios">
      {/* Cuando hay un cambio en el desplegable, se recoge su valor y se pasa como argumento  */}
      <select
        id="usuarios"
        name="usuarios"
        value={defaultValue}
        onChange={(e) => onChangeDeportista(e.target.value)}
      >
        <option value="">Elija un deportista</option>
        {deportistas.map(({id,nombre,apellido}) => (
          <option key={id} value={id}>
            {nombre} {apellido}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDeportistas;
