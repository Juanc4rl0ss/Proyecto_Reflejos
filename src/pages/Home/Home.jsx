import { useState } from "react";
import { where } from "firebase/firestore";
import Header from "../../componentes/Header/Header";
import TablaDeportistas from "../../componentes/TablaDeportistas/TablaDeportistas";
import "./Home.css";
import useFirebaseDeportes from "../../hooks/useFirebaseDeportes";
import { toCapital } from "../../helpers/upperCapital";


const Home = () => {
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroApellido1, setFiltroApellido1] = useState("");
  const [filtroApellido2, setFiltroApellido2] = useState("");
  const [filtroDeporte, setFiltroDeporte] = useState("");

  const { deportesUnicos } = useFirebaseDeportes();

  // Los filtros que se aplicaran al pulsar el boton buscar
  const [filtros, setFiltros] = useState(null);

  // Metodo que maneja el evento de buscar
  const handleClickBuscar = () => {
    let nuevosFiltros = [];
    if (filtroNombre !== "") {
      nuevosFiltros.push(where("nombre", "==", filtroNombre));
    }
    if (filtroApellido1 !== "") {
      nuevosFiltros.push(where("apellido1", "==", filtroApellido1));
    }
    if (filtroApellido2 !== "") {
      nuevosFiltros.push(where("apellido2", "==", filtroApellido2));
    }
    if (filtroDeporte !== "") {
      nuevosFiltros.push(where("deporte", "==", filtroDeporte));
    }
    setFiltros(nuevosFiltros);
  };

  // Metodo que maneja el cambio de nombre en el filtro
  const handleChangeNombre = (e) => {
    let nombre =toCapital(e.target.value);
    setFiltroNombre(nombre);
  };

  // Metodo que maneja el cambio del primer apellido en el filtro
  const handleChangeApellido1 = (e) => {
    let deporte =toCapital(e.target.value);
    setFiltroApellido1(deporte);
  };

  // Metodo que maneja el cambio del segundo apellido en el filtro
  const handleChangeApellido2 = (e) => {
    let deporte =toCapital(e.target.value);
    setFiltroApellido2(deporte);
  };

  // Metodo que maneja el cambio de deporte en el filtro
  const handleChangeDeporte = (e) => {
    let deporte = e.target.value;
    setFiltroDeporte(deporte);
  };

  return (
    <main className="page-home">
      <Header />
      <h1 className="text-center mt-5">Buscador de deportistas</h1>
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
                onBlur={(e) => handleChangeNombre(e)}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="apellido1" className="col-sm-2 col-form-label">
              Primer Apellido
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="apellido1"
                onChange={(e) => handleChangeApellido1(e)}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="apellido2" className="col-sm-2 col-form-label">
              Segundo Apellido
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="apellido2"
                onChange={(e) => handleChangeApellido2(e)}
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
                {deportesUnicos.map((deporte) => (
                  <option value={deporte} key={deporte}>
                    {deporte}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleClickBuscar}>
            Buscar
          </button>
        </div>
        {filtros != null && (
          <div className="listado">
            <TablaDeportistas filtros={filtros}></TablaDeportistas>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
