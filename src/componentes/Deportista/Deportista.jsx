//Aquí elijes la ruta de la hoja de estilos,y con eso ya todo lo que se hace aquí, se maqueta de manera modular
import { useEffect, useState } from "react";
import "./Deportista.css";
import Resultados from "../Resultados/Resultados";
import Mensaje from "./Mensaje/Mensaje";
//import Resultados from "../../pages/Resultados/Resultados";

const Deportista = (props) => {
  let inicialTab = getCookieByName("tab");
  if (inicialTab === null){
    inicialTab = 1;
  }
  const { nombre, apellido1, apellido2, club, deporte, fechanacimiento, historiasClinicas, resultados } = props;
  const [toggleState, setToggleState] = useState(inicialTab);
  const [showResult, setShowResult] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
    if (index ==1 || index == 2){
      document.cookie="tab=" + index + "; max-age=86400";
    }
    // Hacer scroll hacia arriba
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    //cuando se monta valor null para error carga useFirebaseGetRespuesta id

    //cuando se desmonta limpia localStorage si existe para cambio  de página
    return () => {
      if (typeof localStorage !== "undefined") {
        localStorage.clear();
      }

      setShowResult(false);
    };
  }, []);

  //añade id a localStorage con el value que trae el evento que es el id.resultados
  const handleDetalle = (e) => {
    toggleTab(3);

    localStorage.setItem("id", e.target.value);
    setShowResult(true);
  };

  function getCookieByName(name){
    const cookies = document.cookie.split(";");
    for (let i=0; i<cookies.length;i++){
      if (cookies[i].includes(name + "=" )){
        return cookies[i].split("=")[1];
      }
    }
    return null;
  }

  return (
    <div>
      <div
        className="tabContainer d-flex justify-content-between align-items-center py-3"
        style={{ backgroundColor: "#d9d9d9" }}
      >
        <div className="w-100 text-center">
          <h2>
            <span className="text-white">
              {nombre} {apellido1} {apellido2}
            </span>
          </h2>
        </div>
      </div>
      <div className="menu d-flex justify-content-center">
        <div className=" d-flex ">
          <div
            className={`px-2 ${toggleState == 1 ? "activeTabs" : ""} mb-3 me-3 boton `}
            onClick={() => toggleTab(1)}
          >
            Perfil
          </div>
          <div className={`px-2 ${toggleState == 2 ? "activeTabs" : ""} mb-3 me-3 boton`} onClick={() => toggleTab(2)}>
            Resultados
          </div>
          {toggleState === 3 && (
            <div className={`px-3 ${toggleState == 3 ? "activeTabs" : ""} mb-3 me-3 boton`}>Detalles</div>
          )}
        </div>
      </div>
      <div className={toggleState == 1 ? "content activeContent" : "content"}>
        <div className="justify-content-center">
          <div className="col-md-12">
            <div className="card mb-3 mt-3">
              <div className="card-header">Datos Personales</div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-4">Nombre:</dt>
                  <dd className="col-sm-8">{`${nombre} ${apellido1} ${apellido2}`}</dd>
                  <dt className="col-sm-4">Club:</dt>
                  <dd className="col-sm-8">{club}</dd>
                  <dt className="col-sm-4">Deporte:</dt>
                  <dd className="col-sm-8">{deporte}</dd>
                  <dt className="col-sm-4">Fecha de nacimiento:</dt>
                  <dd className="col-sm-8">{fechanacimiento}</dd>
                </dl>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header">Historia Clínica</div>
              <div className="card-body">
                <table className="table table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Descripción</th>
                      <th scope="col">Inicio</th>
                      <th scope="col">Fin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historiasClinicas && historiasClinicas.length > 0 ? (
                      historiasClinicas.map((historia, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{historia.descripcion}</td>
                            <td>
                              {historia.fechainicio
                                ? new Date(historia.fechainicio.seconds * 1000).toLocaleDateString()
                                : "Fecha no disponible"}
                            </td>
                            <td>
                              {historia.fechafin
                                ? new Date(historia.fechafin.seconds * 1000).toLocaleDateString()
                                : "Fecha no disponible"}
                            </td>
                          </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No hay historias clínicas disponibles.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={toggleState == 2 ? "content activeContent" : "content"}>
        <div className="container my-3">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="card-header">Datos Personales</div>
                <div className="card-body">
                  <table className="table table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Programa</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Disp. apagados</th>
                        <th scope="col">Nº de fallos</th>
                        <th scope="col">Detalles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultados && resultados.length > 0 ? (
                        resultados.map((resultado, index) => (
                          <tr key={index}>
                            <td scope="row">{index + 1}</td>
                            <td>{resultado.programa ? resultado.programa.descripcion : ""}</td>
                            <td>{resultado.fecha.toDate().toLocaleDateString()}</td>
                            <td>{resultado.categoria}</td>
                            <td>{resultado.dispositivosApagados}</td>
                            <td>{resultado.numeroFallos}</td>
                            <td>
                              <button
                                className="btn btn-outline-primary btn-sm link"
                                value={resultado.idResultado}
                                onClick={(e) => {
                                  handleDetalle(e);
                                }}
                              >
                                Detalles
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">
                            <Mensaje tipo="warning">No hay historias clínicas disponibles.</Mensaje>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={toggleState == 3 ? "content activeContent" : "content"}>
        {showResult === true && <Resultados id={localStorage.getItem("id")} />}
      </div>
    </div>
  );
};
export default Deportista;
