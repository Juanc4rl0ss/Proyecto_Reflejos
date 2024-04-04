import { useState } from "react";
import { useParams } from "react-router-dom";
import SelectDeportistas from "../../componentes/SelectDeportistas/SelectDeportistas";
import Header from "../../componentes/Header/Header";
import "./Deportistas.css";
import PanelDetallesDeportista from "../../componentes/PanelDetallesDeportista/PanelDetallesDeportista";

const Deportistas = () => {
  //Se obtiene el id del deportista pasado por parametro en la URL
  const { id } = useParams();
  const [idUsuarioSeleccionado, setIdUsuarioSeleccionado] = useState(id);

  //Ésta constante se activa cada vez que hay un cambio en el selector de deportistas, pasándole como parámetro el id
  //Además, modifica el valor de useState 'usuarioIdSeleccionado' y ejecuta el useEffect
  const handleSeleccionUsuario = (idDeportista) => {
    setIdUsuarioSeleccionado(idDeportista);
  };

  return (
    <main>
      <Header />
      <section className="container mt-4">
        <div className="filtros mb-4">
          <div className="row mb-3">
            <div className="col">
              <SelectDeportistas onChangeDeportista={handleSeleccionUsuario} defaultValue={idUsuarioSeleccionado} />
            </div>
          </div>
          </div>
        {idUsuarioSeleccionado && <PanelDetallesDeportista idDeportista={idUsuarioSeleccionado} />}
      </section>
    </main>
  );
};

export default Deportistas;
