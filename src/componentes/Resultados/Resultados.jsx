import React from "react";
//import { useParams } from "react-router-dom";
//import Header from "../../componentes/Header/Header";
import useFirebaseGetResultados from "../../hooks/useFirebaseGetResultados";
import Loading from "../../componentes/Loading/Loading";
const Resultados = ({id}) => {
 // const { id } = useParams();
  const { datosResultado, datosPrograma, loading, error } = useFirebaseGetResultados(id);
  return (
    <>
      {loading && <Loading />}
      {!loading && datosResultado != null && datosPrograma != null &&  (
        <main className="bg-white ml-2">
          {/*<Header />*/}
          <h1 className="text-center mt-5">Detalles de resultado</h1>
          <section className="container d-flex flex-column justify-content-center w-100 mt-4">
            <div className="col-md-12">
              <div className="card mb-3 mt-3">
                <div className="card-header">Datos de resultado</div>
                <div className="card-body">
                  <dl className="row ms-1 mb-0">
                    <dt className="col-sm-4">Fecha:</dt>
                    <dd className="col-sm-8">{datosResultado.fecha.toDate().toLocaleDateString()}</dd>
                    <dt className="col-sm-4">Categoria:</dt>
                    <dd className="col-sm-8">{datosResultado.tipoejercicio}</dd>
                    <dt className="col-sm-4">Distancia al dispositivo:</dt>
                    <dd className="col-sm-8">{datosResultado.distanciaaldispositivo}</dd>
                    <dt className="col-sm-4">Tiempo medio reaccion:</dt>
                    <dd className="col-sm-8">{datosResultado.mediatiemporeaccion}</dd>
                    <dt className="col-sm-4">Nº dispositivos apagados:</dt>
                    <dd className="col-sm-8">{datosResultado.numerodispositivosapagados}</dd>
                    <dt className="col-sm-4">Nº fallos:</dt>
                    <dd className="col-sm-8">{datosResultado.numerofallos}</dd>
                    <dt className="col-sm-4">Tiempo de ejercicio:</dt>
                    <dd className="col-sm-8">{datosResultado.tiempototalejercicio}</dd>
                    <dt className="col-sm-4">Tiempo empleado:</dt>
                    <dd className="col-sm-8">{datosResultado.tiempototalempleado}</dd>
                  </dl>
                </div>
              </div>
              <div className="card mb-3 mt-3">
                <div className="card-header">Datos de programa</div>
                <div className="card-body">
                  <dl className="row ms-1 mb-0">
                    <dt className="col-sm-4">Programa:</dt>
                    <dd className="col-sm-8">{datosPrograma.descripcion}</dd>
                    <dt className="col-sm-4">Distancia:</dt>
                    <dd className="col-sm-8">{datosPrograma.distancia}</dd>
                    <dt className="col-sm-4">Nº ciclos:</dt>
                    <dd className="col-sm-8">{datosPrograma.nciclos}</dd>
                    <dt className="col-sm-4">Tiempo empleado:</dt>
                    <dd className="col-sm-8">{datosPrograma.tejercicio}</dd>
                    <dt className="col-sm-4">Tiempo de descanso:</dt>
                    <dd className="col-sm-8">{datosPrograma.tdescanso}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
      ;
    </>
  );
};

export default Resultados;
