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

  /*ésta sería otra opción
  const Usuario=({nombre,apellido1,apellido2,club,deporte,fechanacimiento})=>{ 
  */

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div>
      <div className="tabContainer">
        <h2>
          <span className="nombre">{`${nombre} ${apellido1} ${apellido2}`}</span>
        </h2>
        <div className="menu">
          <div
            className={toggleState === 1 ? "tabs activeTabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Perfil
          </div>
          <div
            className={toggleState === 2 ? "tabs activeTabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Resultados
          </div>
        </div>
      </div>

      <div className={toggleState === 1 ? "content activeContent" : "content"}>
        <div className="datos">
          <h3>Datos Personales</h3>
          <h4>
            Nombre:&nbsp;&nbsp; <span className="estiloDatos">{nombre}</span>{" "}
            <span className="estiloDatos">{apellido1}</span>{" "}
            <span className="estiloDatos">{apellido2}</span>{" "}
          </h4>
          <h4>
            Club:&nbsp; &nbsp; <span className="estiloDatos">{club}</span>
          </h4>
          <h4>
            Deporte: &nbsp; &nbsp;<span className="estiloDatos">{deporte}</span>
          </h4>
          <h4>
            Fecha de nacimiento: &nbsp; &nbsp;{" "}
            <span className="estiloDatos">{fechanacimiento}</span>
          </h4>
        </div>
        <div className="datos">
          <h3>Historia clínica</h3>
          <h4>
            Descripción: &nbsp; &nbsp;{" "}
            <span className="esitlosDatos">{descripcion}</span>{" "}
          </h4>
          <h4>
            Ejercicio rehabilitación:{" "}
            <span className="estiloDatos">{ejercicio} </span>
          </h4>
          <ul>
            <li>
              Fecha de inicio: <span className="estiloDatos">{inicio} </span>{" "}
            </li>
            <li>
              Fecha de fin: <span className="estiloDatos">{fin} </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={toggleState === 2 ? "content activeContent" : "content"}>
        <div className="datos">
          <h4>
            Nombre: <span className="estiloDatos">{pNombre}</span>{" "}
          </h4>
          <h4>
            Tipo: <span className="estiloDatos">{pTipo} </span>
          </h4>
          <h4>
            Distancia: <span className="estiloDatos">{pDistancia}</span>{" "}
          </h4>
          <h4>
            Ciclos: <span className="estiloDatos">{pCiclos} </span>
          </h4>
          <h4>
            Tiempo ejercicio:{" "}
            <span className="estiloDatos">{pTiempoEjer} </span>
          </h4>
          <h4>
            Tiempo descanso: <span className="estiloDatos">{pTiempoDesc} </span>
          </h4>
        </div>
        <div className="datos">
          <h4>
            Fecha: <span className="estiloDatos">{fechaR}</span>{" "}
          </h4>
          <h4>
            Distancia dispositivo:{" "}
            <span className="estiloDatos">{distanciaDispositivo} </span>
          </h4>
          <h4>
            Timepo de reacción:{" "}
            <span className="estiloDatos">{tiempoReac}</span>{" "}
          </h4>
          <h4>
            Tiempo total ejercido:{" "}
            <span className="estiloDatos">{tiempoEjer} </span>
          </h4>
          <h4>
            Tiempo total empleado:{" "}
            <span className="estiloDatos">{tiempoEmpleado} </span>
          </h4>
          <h4>
            Numero de fallos: <span className="estiloDatos">{nFallos} </span>
          </h4>
        </div>
      </div>
    </div>
  );
};
export default Deportista;
