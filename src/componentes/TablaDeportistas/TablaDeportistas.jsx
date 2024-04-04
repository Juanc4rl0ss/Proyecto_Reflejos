import { Link } from "react-router-dom";
import "./TablaDeportistas.css";
import Loading from "../../componentes/Loading/Loading";
import useFirebaseDeportistas from "../../hooks/useFirebaseDeportistas";

const TablaDeportistas = ({filtros}) => {
  const { list, loading } = useFirebaseDeportistas(filtros);

  return (
    <>
      {loading && (<Loading/>)}
      {!loading && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre completo</th>
              <th scope="col">Deporte</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((deportista) => (
              <tr key={deportista.id}>
                <td>{deportista.nombre + " " + deportista.apellido1 + " " + deportista.apellido2}</td>
                <td>{deportista.deporte}</td>
                <td>
                  <Link to={`/deportistas/${deportista.id}`} className="btn btn-outline-primary btn-sm">
                    Ver detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TablaDeportistas;
