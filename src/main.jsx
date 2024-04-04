import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import './main.css'


// Configuracion de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBoZS6sT1qOTTTyT92o-TdQfLAd2jrfNPc",
  authDomain: "reflejos-b216f.firebaseapp.com",
  projectId: "reflejos-b216f",
  storageBucket: "reflejos-b216f.appspot.com",
  messagingSenderId: "683735341103",
  appId: "1:683735341103:web:6d5211e1ac75e18b364eda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);

export { app };