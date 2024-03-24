import { app } from "../../main";
import { useNavigate, Link} from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import "./Header.css";

const Header = () => {
  // Hook de navegación para redirigir después de iniciar sesión
  const navigate = useNavigate();

  // Funcion que cierra la sesion
  const cerrarSesion = () => {
    // Obtener el objeto Auth de Firebase
    const auth = getAuth(app);

    signOut(auth)
      .then(() => {
        console.log("Se ha cerrado sesión correctamente");
        // Redirigimos a la página Login si se ha cerrado sesion correctamente
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión", error);
      });
  };

  return (
    <header className="cabecera">
      <h1>Reflejos</h1>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/deportistas">Deportistas</Link>
          </li>
        </ul>
      </nav>
      <button className="cerrar" onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;
