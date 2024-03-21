import { useState } from "react";
import Deportistas from "../componentes/deportistas.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebase.js";
import "../hojas-de-estilo/login.css";


const Login = () => {
  const [autentificado, setAutentificado] = useState(false);
  //use state para controlar placeholder inputs
  const [emailPlace,setEmailPlace]=useState("Email");
  const[passPlace,setPassPlace]=useState("Contraseña");
  let emailLabel;
  let passLabel;
//quitar placeholder input y label se vea
const cambioInput=(queLabel,idLabel,queEstado)=>{
  queLabel=document.querySelector(idLabel);
  queEstado("");
  queLabel.removeAttribute('hidden');

}
//si campo input y se deja sin valor de nuevo 
  const reseatInput=(e,queLabel,queId,queEstado,mensaje)=>{
    if(e.target.value == ''){
      queLabel=document.querySelector(queId);
      queEstado(mensaje);
      queLabel.setAttribute('hidden', '');
    }
  }

  //evento onchange en inputs se queda con valor input y quita errores si los hubiera
  const changeInputs=(e,queEstadoInput,queEstadoError)=>{
    queEstadoInput(e.target.value);
    queEstadoError("");
  }

  //Utilizamos useState para controlar los valores email y contraseña
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorContraseña, setErrorContraseña] = useState("");

  

  const iniciarSesion = () => {
    signInWithEmailAndPassword(auth, email, contraseña)
      .then((userCredential) => {
        console.log("Sesión iniciada con éxito:", userCredential.user);

        //Si el login tiene éxito, el boolean cambia a true
        setAutentificado(true);
        setErrorEmail("");
        setErrorContraseña("");

      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        switch (error.code) {
          
          case 'auth/invalid-email':
            setErrorEmail("Formato de email inválido.");
            setErrorContraseña(""); // Limpia el mensaje de error para la contraseña
            break;
          case 'auth/user-not-found':
            setErrorEmail("Usuario no encontrado.");
            setErrorContraseña(""); // Limpia el mensaje de error para la contraseña
            break;
          case 'auth/wrong-password':
            setErrorContraseña("Contraseña incorrecta.");
            setErrorEmail(""); // Limpia el mensaje de error para el email
            break;
          case 'auth/missing-password':
            setErrorContraseña("Por favor, introduce una contraseña.");
            setErrorEmail(""); // Limpia el mensaje de error para el email
            break;
          case 'auth/invalid-credential':
            setErrorEmail("");
            setErrorContraseña("La contraseña es incorrecta, vuelve a intentarlo.");
            break;
          default:
            setErrorEmail("Error al iniciar sesión.");
            setErrorContraseña(""); // Limpia el mensaje de error para la contraseña
            break;
        }
      });
  };

  //Si el login ha tenido éxito, renderizamos el componente Deportistas
  if (autentificado) {
    return <Deportistas />;
  }

  return (
    <div className="containerLogin">
      <div className="login">
        <div className="titulo">
        <h2>Iniciar Sesión</h2>
      </div>
      <div className="inputs">
        <div className="iconos">
        <label id="labelEmail" for="email" hidden>Correo electrónico</label>
      
      <input
      id="email"
        type="email"
        value={email}
        onClick={()=>cambioInput(emailLabel,"#labelEmail",setEmailPlace)}
        onChange={(e) => changeInputs(e,setEmail,setErrorEmail)}
        onBlur={(e)=>reseatInput(e,emailLabel,"#labelEmail",setEmailPlace,"Correo electrónico")}
        placeholder={emailPlace}
      />
       <img src="\src\assets\inicioBlanco.svg" alt=""/> 
       {errorEmail && <div className="error">{errorEmail}</div>}

    </div>
    <div className="iconos">
    <label id="labelPass" for="contraseña" hidden>Contraseña</label>
    
      <input
      id="contraseña"
        type="password"
        value={contraseña}
        onClick={()=>cambioInput(passLabel,"#labelPass",setPassPlace)}

        onBlur={(e)=>reseatInput(e,emailLabel,"#labelPass",setPassPlace,"Contraseña")}

        onChange={(e) => changeInputs(e,setContraseña,setErrorContraseña)}
        placeholder={passPlace}
      />
       <img src="\src\assets\passBlanco.svg" alt=""/>
       {errorContraseña && <div className="error">{errorContraseña}</div>}

      </div>
      <button onClick={iniciarSesion}>Iniciar Sesión</button>
     </div> 
    </div>  
    </div>
  );
};
export default Login;
