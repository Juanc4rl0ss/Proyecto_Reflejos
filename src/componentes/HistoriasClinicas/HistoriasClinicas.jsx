// Componente que muestra las historias clínicas de un paciente
const HistoriasClinicas = ({ historiasClinicas }) => {
  return (
    <>
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
    </>
  );
}
export default HistoriasClinicas;