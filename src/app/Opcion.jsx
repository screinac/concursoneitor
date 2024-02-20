"use client";
import React, { useEffect, useState } from "react";

const Opcion = ({
  opciones,
  respuesta,
  revelar,
  setRevelar,
  feedback,
  racha,
  setRacha,
}) => {
  const [opcionesAleatorias, setOpcionesAleatorias] = useState([]);
  useEffect(() => {
    // Generar una copia del arreglo original para no modificarlo directamente
    const opcionesCopia = opciones.slice();

    // Mezclar las opciones de forma aleatoria
    opcionesCopia.sort(() => Math.random() - 0.5);

    // Establecer las opciones aleatorias en el estado
    setOpcionesAleatorias(opcionesCopia);
  }, [opciones, respuesta]);

  return (
    <div>
      {opcionesAleatorias.map((opcion, indice) => {
        return (
          <button
            key={indice}
            className={`${
              revelar
                ? indice === opcionesAleatorias.indexOf(opciones[respuesta - 1])
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-none"
            } border-solid border-2 border-amber-300 rounded-md mb-4 p-2`}
            onClick={() => {
              setRevelar(true);
              if (
                indice === opcionesAleatorias.indexOf(opciones[respuesta - 1])
              ) {
                localStorage.setItem("racha", racha + 1);
                setRacha(racha + 1);
              } else {
                localStorage.setItem("racha", 0);
                setRacha(0);
              }
            }}
          >
            {opcion}
          </button>
        );
      })}
      {revelar && (
        <p>
          <strong>Feedback:</strong> {feedback}
        </p>
      )}
    </div>
  );
};

export default Opcion;
