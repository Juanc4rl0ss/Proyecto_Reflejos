import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from './pages/Login/Login.jsx';
import Deportistas from './pages/Deportistas/Deportistas.jsx';
import Home from "./pages/Home/Home.jsx";
import PaginaNoEncontrada from "./pages/PaginaNoEncontrada/PaginaNoEncontrada.jsx";
import { app } from "./main";


function App() {
  const navigate = useNavigate();

  useEffect(() => {

    //Obtenemos la instancia de autentificación del usuario
    const auth = getAuth(app);

    //Ésta función se pone en modo observación y controla los cambios de sesión (se almacena en una cookie)
    const suscripcionUsuario = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // En caso de que no haya un usuario logueado, redirecciona a /login
        navigate("/login");
      }
    });

    // Limpia el observador cuando el componente se desmonte
    return suscripcionUsuario;
  }, []);

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="/deportistas/:id?" element={ <Deportistas /> } />
      <Route path="*" element={<PaginaNoEncontrada>Oups!, lo sentimos pero la página que busca no se encuentra</PaginaNoEncontrada>} />
    </Routes>
  );
}

export default App;