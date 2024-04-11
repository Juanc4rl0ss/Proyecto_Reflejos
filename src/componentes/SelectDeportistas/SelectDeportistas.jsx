import { useMemo } from "react";
import useFirebaseGetDeportistas from "../../hooks/useFirebaseGetDeportistas";
import "./SelectDeportistas.css";

const SelectDeportistas = ({ onChangeDeportista, defaultValue }) => {
  const filtros = useMemo(() => [], []);
  const { list, loading } = useFirebaseGetDeportistas(filtros);

  return (
    <>
      {!loading && (
        <select
          id="usuarios"
          name="usuarios"
          className="form-select"
          value={defaultValue}
          onChange={(e) => onChangeDeportista(e.target.value)}
        >
          <option value="">Elija un deportista</option>
          {list.map(({ id, nombre, apellido1,apellido2 }) => (
            <option key={id} value={id}>
              {nombre} {apellido1} {apellido2}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default SelectDeportistas;
