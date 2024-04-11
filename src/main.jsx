import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import './main.css'


// Configuracion de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCAJpPSiOo9OesYjreyWcn0tuGkVWJ_PFs",
  authDomain: "reflejos-66014.firebaseapp.com",
  projectId: "reflejos-66014",
  storageBucket: "reflejos-66014.appspot.com",
  messagingSenderId: "317448421660",
  appId: "1:317448421660:web:6b72629a8cddebd0bc3ad9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);

export { app };