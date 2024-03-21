import { Usu } from "../src/firebase";
import '../hojas-de-estilo/usuariosDeportistas.css';

const SelectUsuario = ({deportista}) => {
  const datosUsuario = Usu;

  return (
    <div className="inputUsuarios">

      {/* Cuando hay un cambio en el desplegable, se recoge su valor y se pasa como argumento  */}
      <select id="usuarios" name="usuarios" onChange={(e) => deportista(e.target.value)}>
      <option value="">Elija un deportista</option>
        {datosUsuario.map((usuario) => (
          <option key={usuario.id} value={usuario.id}>
            {usuario.nombre} {usuario.apellido}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectUsuario;