//Aquí elijes la ruta de la hoja de estilos,y con eso ya todo lo que se hace aquí, se maqueta de manera modular
import { useState } from "react";
import "./Deportista.css";

const Deportista = (props) => {
  const {
    nombre,
    apellido1,
    apellido2,
    club,
    deporte,
    fechanacimiento,
    descripcion,
    ejercicio,
    inicio,
    fin,
    fechaR,
    distanciaDispositivo,
    tiempoReac,
    tiempoEjer,
    tiempoEmpleado,
    nFallos,
    pNombre,
    pTipo,
    pDistancia,
    pCiclos,
    pTiempoEjer,
    pTiempoDesc,
  } = props;

  const datosTabla = [
    { descripcion: "Nombre", detalle: pNombre },
    { descripcion: "Tipo", detalle: pTipo },
    { descripcion: "Distancia", detalle: pDistancia },
    { descripcion: "Ciclos", detalle: pCiclos },
    { descripcion: "Tiempo ejercicio", detalle: pTiempoEjer },
    { descripcion: "Tiempo descanso", detalle: pTiempoDesc },
    { descripcion: "Fecha", detalle: fechaR },
    { descripcion: "Distancia dispositivo", detalle: distanciaDispositivo },
    { descripcion: "Tiempo de reacción", detalle: tiempoReac },
    { descripcion: "Tiempo total ejercido", detalle: tiempoEjer },
    { descripcion: "Tiempo total empleado", detalle: tiempoEmpleado },
    { descripcion: "Número de fallos", detalle: nFallos },
  ];

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
    window.scrollTo(0, 0);
  };

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
              className={`px-2 ${
                toggleState === 1 ? "activeTabs" : ""
              } mb-3 me-3 boton `}
              onClick={() => toggleTab(1)}
            >
              Perfil
            </div>
            <div
              className={`px-2 ${
                toggleState === 2 ? "activeTabs" : ""
              } mb-3 me-3 boton`}
              onClick={() => toggleTab(2)}
            >
              Resultados
            </div>
          </div>
          </div> 
      <div className={toggleState === 1 ? "content activeContent" : "content"}>
        
        <div className="container my-5">
          
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="bg-white m-3 p-4 border border-1 border shadow">
                <h3>Datos Personales</h3>
                <h4>
                  Nombre:{" "}
                  <span className="text-secondary">{`${nombre} ${apellido1} ${apellido2}`}</span>
                </h4>
                <h4>
                  Club: <span className="text-secondary">{club}</span>
                </h4>
                <h4>
                  Deporte: <span className="text-secondary">{deporte}</span>
                </h4>
                <h4>
                  Fecha de nacimiento:{" "}
                  <span className="text-secondary">{fechanacimiento}</span>
                </h4>

                <div className="mt-4">
                  <h3>Historia Clínica</h3>
                  <h4>
                    Descripción:{" "}
                    <span className="text-secondary">{descripcion}</span>
                  </h4>
                  <div>
                    <h4>
                      Ejercicio rehabilitación:{" "}
                      <span className="text-secondary">{ejercicio}</span>
                    </h4>
                    <div className="small">
                      <h6>
                        Fecha de inicio:{" "}
                        <span className="text-secondary">{inicio}</span>
                      </h6>
                      <h6>
                        Fecha de fin:{" "}
                        <span className="text-secondary">{fin}</span>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={toggleState === 2 ? "content activeContent" : "content"}>
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="table-responsive bg-white m-3 p-4 shadow">
                <table className="table table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Descripción</th>
                      <th scope="col">Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosTabla.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.descripcion}</td>
                        <td className="text-secondary">{item.detalle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Deportista;
;
