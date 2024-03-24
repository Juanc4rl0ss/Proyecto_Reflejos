import { Routes, Route } from "react-router-dom"
import Login from './pages/Login/Login.jsx';
import Deportistas from './pages/Deportistas/Deportistas.jsx';
import Home from "./pages/Home/Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="/deportistas/:id?" element={ <Deportistas /> } />
    </Routes>
  );
}

export default App;