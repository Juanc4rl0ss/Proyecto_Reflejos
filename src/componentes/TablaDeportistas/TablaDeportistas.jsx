import { Link } from "react-router-dom";
import "./TablaDeportistas.css";

const SelectDeportistas = ({ listadoDeportistas }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Nombre completo</th>
          <th scope="col">Deporte</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {listadoDeportistas.map((deportista) => (
          <tr key={deportista.id}>
            <td>
              {deportista.nombre +
                " " +
                deportista.apellido1 +
                " " +
                deportista.apellido2}
            </td>
            <td>{deportista.deporte}</td>
            <td>
              <Link
                to={`/deportistas/${deportista.id}`}
                className="btn btn-outline-primary btn-sm"
              >
                Ver detalles
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SelectDeportistas;
