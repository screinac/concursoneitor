"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { data } from "./data";
import Opcion from "./Opcion";

const maxEnun = data.length;

var preguntaActual = 0;
var numEnunciado = 0;

var randAux = 0;

var initRand = true;

var numFrase = 0;

const frases = [
  "No creo en la suerte, la suerte la fabrico yo.",
  "No se trata del dinero o conexiones, es la voluntad de trabajar y aprender más que todos.",
  "Somos los pulpos, los millonarios no están completos, aún faltamos nosotros.",
  "Tus ingresos únicamente pueden crecer hasta donde tú crezcas.",
  "Si no tienes lo que quieres entonces trabaja más duro.",
  "Si no quieres ser un simple pez, aprende a nadar con tiburones.",
  "Si algo interfiere entre tú y el éxito, apartalo de tu lado.",
];

export default function Home() {
  //racha
  const [racha, setRacha] = useState(0);

  //frases motivacionales
  const [frase, setFrase] = useState(frases[numFrase]);

  // const [numEnunciado, setNumEnunciado] = useState(0);

  const [enunciado, setEnunciado] = useState(data[numEnunciado]);

  // const [preguntaActual, setPreguntaActual] = useState(0);

  const [pregunta, setPregunta] = useState(enunciado.preguntas[preguntaActual]);

  const [revelar, setRevelar] = useState(false);

  // const { pregunta, opciones, respuesta } = ;

  const handleNextQuestion = () => {
    if (preguntaActual + 1 >= enunciado.preguntas.length) {
      // actualiza frase
      numFrase = Math.floor(Math.random() * frases.length);
      setFrase(frases[numFrase]);

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
      //setEnunciado(data[data.length - 1]);

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
    if (initRand) {
      randAux = Math.floor(Math.random() * maxEnun);
      setEnunciado(data[randAux]);
      initRand = false;
    }
    // lee racha del buscador
    const dataFromLocalStorage = localStorage.getItem("racha");
    if (dataFromLocalStorage) {
      setRacha(parseInt(dataFromLocalStorage));
    }

    setPregunta(enunciado.preguntas[preguntaActual]);
  }, [enunciado]);

  return (
    <main className="block m-5 ">
      <h1 className="text-4xl font-bold text-amber-500 mb-3">Concursoneitor</h1>

      <p className="text-amber-500 mb-1">{frase}</p>

      {racha > 10 ? (
        <p className="mb-3 text-amber-400">
          RACHAAA MOSCAA: <strong className="text-xl">{racha}</strong>
        </p>
      ) : racha > 3 ? (
        <p className="mb-3 text-amber-400">
          RACHAAA: <strong className="text-xl">{racha}</strong>
        </p>
      ) : (
        <p className="mb-3 text-amber-400">
          Racha: <strong className="text-xl">{racha}</strong>
        </p>
      )}

      <p className="mb-5 text-lg">{enunciado.enunciado}</p>

      <div>
        <p className="mb-5">{pregunta.pregunta}</p>
        <Opcion
          opciones={pregunta.opciones}
          respuesta={pregunta.respuesta}
          revelar={revelar}
          setRevelar={setRevelar}
          feedback={pregunta.feedback}
          racha={racha}
          setRacha={setRacha}
        ></Opcion>
      </div>

      {revelar && (
        <button
          onClick={() => handleNextQuestion()}
          className="bg-amber-300 text-black px-4 py-2 rounded-md mt-3"
        >
          Siguiente
        </button>
      )}
    </main>
  );
}
