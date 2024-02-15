"use client";
import React, { useEffect, useState } from "react";

const Opcion = ({ opciones, respuesta, revelar, setRevelar }) => {
  return (
    <div>
      {opciones.map((opcion, indice) => {
        return (
          <button
            key={indice}
            className={`${
              revelar
                ? indice === respuesta - 1
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-none"
            } border-solid border-2 border-amber-300 rounded-md mb-4 p-2`}
            onClick={() => setRevelar(true)}
          >
            {opcion}
          </button>
        );
      })}
    </div>
  );
};

export default Opcion;
