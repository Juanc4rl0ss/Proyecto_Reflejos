import { Link } from "react-router-dom";
import './NotFoundPage.css';

function NotFoundPage({ children }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4 text-dark">404</h1>
        <p className="lead text-dark">{children}</p>
        <Link to="/Home" className="btn btn-primary btn-lg">Volver al Home</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;