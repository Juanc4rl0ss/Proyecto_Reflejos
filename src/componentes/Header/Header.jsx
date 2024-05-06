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
        Toastify({
          text: "Sesión cerrada correctamente",
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function(){} // Función opcional si se necesita algún manejo adicional
        }).showToast();
        // Redirigimos a la página Login si se ha cerrado sesion correctamente
        navigate("/login");
        
      })
      .catch((error) => {
        console.error("Error al cerrar sesión", error);
      });
  };

  return (
    
    <div className="container">
    <div className="container-cabecera row ">
    <header className="cabecera col-md-12">
      <h1 className="titulo text-center" >Reflejos</h1>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    
    <ul className="navbar-nav ">
      <li className="nav-item active">
      <Link className="nav-link" to="/home">Home</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/deportistas">Deportistas</Link>
      </li>
      <li className="nav-item">
      <button  className="nav-link" onClick={cerrarSesion}>Cerrar sesión</button>
      </li>
     
    </ul>
  </div>
  
</nav>


    
    </header>
    </div>
</div>
  );
};

export default Header;
