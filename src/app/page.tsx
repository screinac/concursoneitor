"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { data } from "./data";
import Opcion from "./Opcion";

const maxEnun = data.length;

var preguntaActual = 0;
var numEnunciado = 0;

var randAux = 0;

export default function Home() {
  // const [numEnunciado, setNumEnunciado] = useState(0);

  const [enunciado, setEnunciado] = useState(data[numEnunciado]);

  // const [preguntaActual, setPreguntaActual] = useState(0);

  const [pregunta, setPregunta] = useState(enunciado.preguntas[preguntaActual]);

  const [revelar, setRevelar] = useState(false);

  // const { pregunta, opciones, respuesta } = ;

  const handleNextQuestion = () => {
    if (preguntaActual + 1 >= enunciado.preguntas.length) {
      // actauliza num aleatorio

      randAux = Math.floor(Math.random() * maxEnun);
      if (numEnunciado === randAux) {
        if (randAux + 1 >= maxEnun - 1) {
          numEnunciado = randAux - 1;
        } else {
          numEnunciado = randAux + 1;
        }
      } else {
        numEnunciado = randAux;
      }
      setEnunciado(data[numEnunciado]);

      console.log("enunciado", numEnunciado);
      //******/
      preguntaActual = 0;

      // setPregunta(enunciado.preguntas[preguntaActual]);
      window.scrollTo(0, 0);
      console.log("Enunciado actual: ", numEnunciado);
      console.log("pregunta actual: ", preguntaActual);
    } else {
      preguntaActual++;
      setPregunta(enunciado.preguntas[preguntaActual]);
      //      setPreguntaActual(preguntaActual + 1);
      window.scrollTo(0, 0);
      console.log("Enunciado actual: ", numEnunciado);
      console.log("pregunta actual: ", preguntaActual);
    }
    setRevelar(false);
  };

  useEffect(() => {
    setPregunta(enunciado.preguntas[preguntaActual]);
  }, [enunciado]);

  return (
    <main className="block m-5">
      <h1 className="text-2xl text-amber-100 mb-3">Concursoneitor</h1>
      <p className="mb-5 text-lg">{enunciado.enunciado}</p>

      <div>
        <p className="mb-5">{pregunta.pregunta}</p>
        <Opcion
          opciones={pregunta.opciones}
          respuesta={pregunta.respuesta}
          revelar={revelar}
          setRevelar={setRevelar}
        ></Opcion>
      </div>

      <button
        onClick={() => handleNextQuestion()}
        className="bg-amber-300 text-black px-4 py-2 rounded-md mt-2"
      >
        Siguiente
      </button>
    </main>
  );
}
