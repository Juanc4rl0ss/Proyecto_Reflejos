// Componnete que renderiza un mensaje con el texto indicado en las props
const Mensaje = ({ children, tipo }) => {
  return (
    <div className={`alert alert-${tipo}`} role="alert">
      {children}
    </div>
  );
};

export default Mensaje;
