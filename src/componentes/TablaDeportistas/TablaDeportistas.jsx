import { Link } from "react-router-dom";
import "./TablaDeportistas.css";
import Loading from "../../componentes/Loading/Loading";
import useFirebaseGetDeportistas from "../../hooks/useFirebaseGetDeportistas";
import Mensaje from "../Deportista/Mensaje/Mensaje";
import "./TablaDeportistas.css";

const TablaDeportistas = ({filtros}) => {
  const { list, loading, error} = useFirebaseGetDeportistas(filtros);

  if (error){
    return (<Mensaje tipo="danger">Ha ocurrido un error al consultar Firebase</Mensaje>);
  }

  return (
    <>
      {loading && (<Loading/>)}
      {!loading && list.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre completo</th>
              <th scope="col">Deporte</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map(({id,nombre,apellido1,apellido2,deporte}) => (
              <tr key={id}>
                <td>{nombre + " " + apellido1 + " " + apellido2}</td>
                <td>{deporte}</td>
                <td>
                  <Link to={`/deportistas/${id}`} className="btn btn-outline-primary btn-sm link">
                    Ver detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && list.length == 0 && (<Mensaje tipo="primary">No se han encontrado resultados con esos criterios de busqueda</Mensaje>)}
    </>
  );
};

export default TablaDeportistas;
