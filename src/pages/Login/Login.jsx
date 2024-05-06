import { app } from "../../main";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import "./Login.css";
const Login = () => {
  // Estados para los inputs del formulario, creo objeto para usar atributo name y recoger cambios

  const [inputs, setInputs] = useState({
    Email: "",
    Contraseña: ""
  });

  // Estados para los placeholder Email y Contraseña controla hidden



  // Estados para los errores en campos Email y Contraseña
  const [errorEmail, setEmailError] = useState("");
  const [errorContraseña, setContraseñaError] = useState("");

  //Estado para implementar un efecto visual interactivo con el icono del mouse
  const [posicionCursor, setPosicion] = useState({ x: 0, y: 0 })

  //cada vez que cambia la posición de 'posicionCursor' se va actualizando y mostrando las coordenadas del puntero
  useEffect(() => {

    const manejarMovimiento = (event) => {
      const { clientX, clientY } = event
      setPosicion({ x: clientX, y: clientY })
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
  const handleInput = (e) => {
    //busco id input es igual a for label
    let id = e.target.id;
    let label = document.querySelector(`label[for=${id}]`);

    label.removeAttribute("hidden");

  };

  // Se rellena el placeholder y se oculta la label del imput
  const handleReset = (e) => {
    if (e.target.value == "") {
      let id = e.target.id;
      let label = document.querySelector(`label[for=${id}]`);

      label.setAttribute("hidden", "");
    }

  };

  /* Se guarda el valor del input y se quita el mensaje de error si lo hubiera
  uso e.target.name para relacionar objeto de los inputs y poner valor*/
  const handleInputs = (e, setInput, setInputError) => {
    setInput({
      ...inputs,
      [e.target.name]: e.target.value
    });
    setInputError("");
  };

  // Función que inicia sesión con el email y contraseña introducidos en el formulario
  const iniciarSesion = () => {
    console.log(inputs);
    signInWithEmailAndPassword(auth, inputs.Email, inputs.Contraseña)
      // Si se logea con exito
      .then((userCredential) => {

        console.log(userCredential);
        console.log(
          `Se ha iniciado sesión correctamente, usuario: ${userCredential.user.email}`
        );
        //libreria toastify
        Toastify({

          text: "Iniciado conexión correctamente",
         
           style: {
            background: "linear-gradient(to right, #0074D9, #7FDBFF)",
          },
          duration: 3000
         
          
          }).showToast();
        // Redirigimos a la página Home si hemos conseguido iniciar sesión.
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

              <label id="Email" htmlFor="Email" hidden>
                Correo electronico
              </label>
              <input
                id="Email"
                type="email"
                value={inputs.Email}
                name="Email"
                onClick={(e) => handleInput(e)}
                onChange={(e) => handleInputs(e, setInputs, setEmailError)}
                onBlur={(e) =>
                  handleReset(e)
                }
                placeholder="Correo electrónico"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
              </svg>
              {errorEmail && <div className="error">{errorEmail}</div>}
            </div>
            <div className="iconos">
              <label id="Contraseña" htmlFor="Contraseña" hidden>
                Contraseña
              </label>

              <input
                id="Contraseña"
                type="password"
                value={inputs.pass}
                name="Contraseña"
                onClick={(e) => handleInput(e)}
                onChange={(e) =>
                  handleInputs(e, setInputs, setContraseñaError)
                }
                onBlur={(e) => handleReset(e)}
                placeholder="Contraseña"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
              </svg>
              {errorContraseña && (
                <div className="error">{errorContraseña}</div>
              )}
            </div>
            <button onClick={iniciarSesion}>Siguiente</button>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Login;
