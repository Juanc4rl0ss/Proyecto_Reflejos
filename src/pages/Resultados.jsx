import React from "react";
import Header
 from "../componentes/Header/Header";
const Resultados = () => {
  return (
    <main className="bg-white ml-2">
      <Header />
      <h1 className="text-center mt-5">Detalles de resultado</h1>
      <section className="container d-flex flex-column justify-content-center w-100 mt-4">
          <div className="col-md-12">
            <div className="card mb-3 mt-3">
              <div className="card-header">Detalles de resultado</div>
              <div className="card-body">
                <dl className="mb-0">
                  <dt className="col-sm-4">Fecha:</dt>
                  <dd className="col-sm-8"></dd>
                  <dt className="col-sm-4">Programa:</dt>
                  <dd className="col-sm-8"></dd>
                  <dt className="col-sm-4">Categoria:</dt>
                  <dd className="col-sm-8"></dd>
                  <dt className="col-sm-4">Distancia al dispositivo:</dt>
                  <dd className="col-sm-8"></dd>
                  <dt className="col-sm-4">Tiempo medio reaccion:</dt>
                  <dd className="col-sm-8"></dd>
                  <dt className="col-sm-4">Nº dispositivos apagados:</dt>
                  <dd className="col-sm-8"></dd>
                  <dt className="col-sm-4">Nº fallos:</dt>
                  <dd className="col-sm-8"></dd>
                  <dt className="col-sm-4">Tiempo de ejercicio:</dt>
                  <dd className="col-sm-8"></dd>
                  <dt className="col-sm-4">Tiempo empleado:</dt>
                  <dd className="col-sm-8"></dd>
                  <dt className="col-sm-4">Nº ciclos:</dt>
                  <dd className="col-sm-8"></dd>
                  <dt className="col-sm-4">Tiempo empleado:</dt>
                  <dd className="col-sm-8"></dd>
                  <dt className="col-sm-4">Tiempo de descanso:</dt>
                  <dd className="col-sm-8"></dd>
                </dl>
              </div>
            </div>
          </div>

      </section>
    </main>
  );
};

export default Resultados;
