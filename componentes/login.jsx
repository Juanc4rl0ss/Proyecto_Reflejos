import { useState } from 'react';
import Deportistas from '../componentes/deportistas.jsx'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from"../src/firebaseConfig";
import { signOut } from "firebase/auth";


const Login = () => {

  
  const [autentificado, setAutentificado] = useState(false);

  //Utilizamos useState para controlar los valores email y contraseña
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');

  const iniciarSesion = () => {  
   
   
      signInWithEmailAndPassword(auth, email, contraseña)
      .then((userCredential) => {
        console.log("Sesión iniciada con éxito:", userCredential.user);
        console.log("Redirigiendo a dashboard.html");

        //Si el login tiene éxito, el boolean cambia a true
        setAutentificado(true);
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
      });

    
  }

  //Si el login ha tenido éxito, renderizamos el componente Deportistas
  if(autentificado){
    return <Deportistas />;
  }

  return(  
    <div>
      <h2>Iniciar Sesión</h2>
      <input
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="Correo electrónico"
      />

      <input
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        placeholder="Contraseña"
      />
      <button onClick={iniciarSesion}>Iniciar Sesión</button>
    </div>
  )
}
export default Login;