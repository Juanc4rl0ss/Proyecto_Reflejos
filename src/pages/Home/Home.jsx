import { app } from "../../main";
import { useState } from "react";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import Header from "../../componentes/Header/Header";
import TablaDeportistas from "../../componentes/TablaDeportistas/TablaDeportistas"
import "./Home.css";

const Home = () => {
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroDeporte, setFiltroDeporte] = useState("");
  const [listadoDeportistas, setListadoDeportistas] = useState([]);

  // Se quita el placeholder del input y se pone visible su label
  const buscar = () => {
    // Obtenemos una instancia de Firestore
    const db = getFirestore(app);

    // Función asincrónica para obtener la lista de deportistas
    async function getDeportistas() {
      const colDeportistas = collection(db, "deportistas");
      let filtros = [];
      if (filtroNombre != "") {
        filtros.push(where("nombre", "==", filtroNombre));
      }
      if (filtroDeporte != "") {
        filtros.push(where("deporte", "==", filtroDeporte));
      }
      const colDeportistasFiltrados = query(colDeportistas, ...filtros);
      const docDeportistas = await getDocs(colDeportistasFiltrados);

      let list = [];

      docDeportistas.forEach((docDeportista) => {
        const deportista = {};
        deportista.id = docDeportista.id;
        deportista.nombre = docDeportista.data().nombre;
        deportista.apellido1 = docDeportista.data().apellido1;
        deportista.apellido2 = docDeportista.data().apellido2;
        deportista.deporte = docDeportista.data().deporte;
        list.push(deportista);
      });
      return list;
    }
    getDeportistas().then((list) => setListadoDeportistas(list));
  };

  // Metodo que maneja el cambio de nombre en el filtro
  const handleChangeNombre = (e) => {
    let nombre = e.target.value;
    setFiltroNombre(nombre);
  };

  // Metodo que maneja el cambio de deporte en el filtro
  const handleChangeDeporte = (e) => {
    let deporte = e.target.value;
    setFiltroDeporte(deporte);
  };

  return (
    <main className="page-home">
      <Header />
      <section className="container mt-4">
        <div className="filtros mb-4">
          <div className="row mb-3">
            <label htmlFor="nombre" className="col-sm-2 col-form-label">
              Nombre
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="nombre"
                onChange={(e) => handleChangeNombre(e)}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="deporte" className="col-sm-2 col-form-label">
              Deporte
            </label>
            <div className="col-sm-10">
              <select
                id="deporte"
                defaultValue=""
                className="form-select"
                onChange={(e) => handleChangeDeporte(e)}
              >
                <option value="">Cualquier deporte</option>
                <option value="Taekwondo">Taekwondo</option>
                <option value="Ciclismo">Ciclismo</option>
                <option value="Futbol">Futbol</option>
                <option value="Baloncesto">Baloncesto</option>
                <option value="Tenis">Tenis</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary" onClick={buscar}>
            Buscar
          </button>
        </div>
        {listadoDeportistas.length !== 0 && (
          <div className="listado">
            <TablaDeportistas listadoDeportistas={listadoDeportistas}></TablaDeportistas>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
