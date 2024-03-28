import { app } from "../../main";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import "./Login.css";

const Login = () => {
  // Estados para los campos Email y Contraseña
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  // Estados para los placeholder Email y Contraseña
  const [emailPlace, setEmailPlace] = useState("Email");
  const [passPlace, setPassPlace] = useState("Contraseña");

  // Estados para los errores en campos Email y Contraseña
  const [errorEmail, setEmailError] = useState("");
  const [errorContraseña, setContraseñaError] = useState("");

  //Estado para implementar un efecto visual interactivo con el icono del mouse
  const [posicionCursor, setPosicion] = useState({x:0,y:0})

  //cada vez que cambia la posición de 'posicionCursor' se va actualizando y mostrando las coordenadas del puntero
  useEffect(() => {

    const manejarMovimiento = (event) => {
      const {clientX, clientY} = event
      console.log('manejarMovimiento', {clientX,clientY})
      setPosicion({x: clientX,y: clientY})
    }

   
      window.addEventListener('pointermove', manejarMovimiento)
    

    return () => {
      window.removeEventListener('pointermove', manejarMovimiento)
    }
    
  })


  // Obtener el objeto Auth de Firebase
  const auth = getAuth(app);

  // Hook de navegación para redirigir después de iniciar sesión
  const navigate = useNavigate();

  // Se quita el placeholder del input y se pone visible su label
  const cambioInput = (e, setInputPlace) => {
    let id = e.target.id;
    let label = document.querySelector(`label[for=${id}]`);
    setInputPlace("");
    label.removeAttribute("hidden");
  };

  // Se rellena el placeholder y se oculta la label del imput
  const resetInput = (e, setInputPlace, placeholder) => {
    if (e.target.value == "") {
      let id = e.target.id;
      let label = document.querySelector(`label[for=${id}]`);
      setInputPlace(placeholder);
      label.setAttribute("hidden", "");
    }
  };

  // Se guarda el valor del input y se quita el mensaje de error si lo hubiera
  const changeInputs = (e, setInput, setInputError) => {
    setInput(e.target.value);
    setInputError("");
  };

  // Función que inicia sesión con el email y contraseña introducidos en el formulario
  const iniciarSesion = () => {
    signInWithEmailAndPassword(auth, email, contraseña)
      // Si se logea con exito
      .then((userCredential) => {
        console.log(
          `Se ha iniciado sesión correctamente, usuario: ${userCredential.user.email}`
        );
        // Redirigimos a la página Deportistas si hemos conseguido iniciar sesión.
        navigate("/home");
      })
      // Si no se consigue logear, se muestra el error
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        switch (error.code) {
          case "auth/invalid-email":
            setEmailError("Formato de email inválido.");
            setContraseñaError(""); // Limpia el mensaje de error para la contraseña
            break;
          case "auth/user-not-found":
            setEmailError("Usuario no encontrado.");
            setContraseñaError(""); // Limpia el mensaje de error para la contraseña
            break;
          case "auth/wrong-password":
            setContraseñaError("Contraseña incorrecta.");
            setEmailError(""); // Limpia el mensaje de error para el email
            break;
          case "auth/missing-password":
            setContraseñaError("Por favor, introduce una contraseña.");
            setEmailError(""); // Limpia el mensaje de error para el email
            break;
          case "auth/invalid-credential":
            setEmailError("");
            setContraseñaError(
              "La contraseña es incorrecta, vuelve a intentarlo."
            );
            break;
          default:
            setEmailError("Error al iniciar sesión.");
            setContraseñaError(""); // Limpia el mensaje de error para la contraseña
            break;
        }
      });
  };

  return (
    <main className="page-login">
      {
      /* Actualiza dinámicamente la posición del div para seguir al puntero del ratón. */
      }
      <div
        className="cursor-puntero"
        style={{
          transform: `translate(${posicionCursor.x - 10}px, ${posicionCursor.y - 10}px)`
        }}
      />
      <div className="containerLogin">
        <div className="login">
          <div className="titulo">
            <h2>Iniciar Sesión</h2>
          </div>
          <div className="inputs">
            <div className="iconos">
              <label id="labelEmail" htmlFor="email" hidden>
                Correo electrónico
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onClick={(e) => cambioInput(e, setEmailPlace)}
                onChange={(e) => changeInputs(e, setEmail, setEmailError)}
                onBlur={(e) =>
                  resetInput(e, setEmailPlace, "Correo electrónico")
                }
                placeholder={emailPlace}
              />
              <img src="\src\assets\inicioBlanco.svg" alt="" />
              {errorEmail && <div className="error">{errorEmail}</div>}
            </div>
            <div className="iconos">
              <label id="labelPass" htmlFor="contraseña" hidden>
                Contraseña
              </label>

              <input
                id="contraseña"
                type="password"
                value={contraseña}
                onClick={(e) => cambioInput(e, setPassPlace)}
                onChange={(e) =>
                  changeInputs(e, setContraseña, setContraseñaError)
                }
                onBlur={(e) => resetInput(e, setPassPlace, "Contraseña")}
                placeholder={passPlace}
              />
              <img src="\src\assets\passBlanco.svg" alt="" />
              {errorContraseña && (
                <div className="error">{errorContraseña}</div>
              )}
            </div>
            <button onClick={iniciarSesion}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Login;
