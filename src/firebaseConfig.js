// Importa solo las funciones que necesitas de los SDKs de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";   
   // Your web app's Firebase configuration
            // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANXyZ-JPFz6vzkVWosjzFgEqew1yRTjA0",
  authDomain: "reflejoss-f0ed6.firebaseapp.com",
  projectId: "reflejoss-f0ed6",
  storageBucket: "reflejoss-f0ed6.appspot.com",
  messagingSenderId: "583481929258",
  appId: "1:583481929258:web:a6b909f561aa1ea1a41d53"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
       
    // Inicializa y exporta la instancia de Auth
    export const auth = getAuth(app);
    console.log(auth);

    // Exporta la app de Firebase si necesitas acceder a ella desde otro lugar
    export default app;