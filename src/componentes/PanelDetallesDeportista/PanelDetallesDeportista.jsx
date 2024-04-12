import "./PanelDetallesDeportista.css";
import Loading from "../../componentes/Loading/Loading";
import useFirebaseGetDetallesDeportista from "../../hooks/useFirebaseGetDetallesDeportista";
import Deportista from "../Deportista/Deportista";
import Mensaje from "../Deportista/Mensaje/Mensaje";

const PanelDetallesDeportista = ({ idDeportista }) => {
  const { detallesDeportista, loading, error } = useFirebaseGetDetallesDeportista(idDeportista);
   
  if (error) {
    return <Mensaje tipo="danger">Ha ocurrido un error al consultar Firebase</Mensaje>;
  }

  return (
    <>
      {loading && <Loading />}
      {!loading && detallesDeportista != null && (

        <Deportista
          nombre={detallesDeportista.datosPersonales.nombre}
          apellido1={detallesDeportista.datosPersonales.apellido1}
          apellido2={detallesDeportista.datosPersonales.apellido2}
          club={detallesDeportista.datosPersonales.club}
          deporte={detallesDeportista.datosPersonales.deporte}
          fechanacimiento={detallesDeportista.datosPersonales.fechanacimiento.toDate().toLocaleDateString()}
          historiasClinicas={detallesDeportista.historiasClinicas} 
          distancia={detallesDeportista.resultados.distanciaaldispositivo}
          fechaR={detallesDeportista.resultados.fecha.toDate().toLocaleDateString()}
          distanciaDispositivo={detallesDeportista.resultados.distanciaaldispositivo}
          tiempoReac={detallesDeportista.resultados.mediatiemporeaccion}
          tiempoEjer={detallesDeportista.resultados.tiempototalejercicio}
          tiempoEmpleado={detallesDeportista.resultados.tiempototalempleado}
          nFallos={detallesDeportista.resultados.numerofallos}
          pNombre={detallesDeportista.programa.descripcion}
          pTipo={detallesDeportista.tipo}
          pDistancia={detallesDeportista.programa.distancia}
          pCiclos={detallesDeportista.programa.nciclos}
          pTiempoEjer={detallesDeportista.programa.tejercicio}
          pTiempoDesc={detallesDeportista.programa.tdescanso}
        />
      )}
      {!loading && detallesDeportista == null && <Mensaje tipo="warning">No se ha encontrado ese deportista</Mensaje>}
    </>
  );
};

export default PanelDetallesDeportista;
