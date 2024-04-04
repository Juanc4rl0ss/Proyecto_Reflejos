import { Link } from "react-router-dom";
import './PaginaNoEncontrada.css';

function PaginaNoEncontrada({ children }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4 text-dark">404</h1>
        <p className="lead text-dark">{children}</p>
        {/* En caso de que estés logueado, te redirige a Home, y si no estás logueado Home te lleva a Login */}
        <Link to="/Home" className="btn btn-primary btn-lg">Volver </Link>
      </div>
    </div>
  );
}

export default PaginaNoEncontrada;