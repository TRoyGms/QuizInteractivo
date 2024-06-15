import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Atoms/Button';
import Input from '../Atoms/Input';

const ContenedorQuiz = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
`;

function VistaPreviaQuiz({ preguntas }) {
  const [respuestasUsuario, setRespuestasUsuario] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleRespuestaChange = (preguntaId, respuesta) => {
    setRespuestasUsuario({
      ...respuestasUsuario,
      [preguntaId]: respuesta,
    });
  };

  const calcularCalificacion = () => {
    let calificacion = 0;
    preguntas.forEach((pregunta) => {
      if (pregunta.tipo === 'opcion_multiple' || pregunta.tipo === 'verdadero_falso') {
        const respuestaCorrecta = pregunta.respuestasCorrectas.join(',');
        if (respuestasUsuario[pregunta.id] === respuestaCorrecta) {
          calificacion++;
        }
      }
    });
    return calificacion;
  };

  const finalizarQuiz = () => {
    setMostrarResultados(true);
  };

  return (
    <ContenedorQuiz>
      <h2>Vista Previa del Quiz</h2>
      {preguntas.map((pregunta) => (
        <div key={pregunta.id}>
          <h3>{pregunta.titulo}</h3>
          {pregunta.tipo === 'opcion_multiple' && (
            <>
              {pregunta.opciones.map((opcion, index) => (
                <div key={index}>
                  <input type="radio" id={`opcion-${index}`} name={`pregunta-${pregunta.id}`} value={opcion} onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)} />
                  <label htmlFor={`opcion-${index}`}>{opcion}</label>
                </div>
              ))}
            </>
          )}
          {pregunta.tipo === 'verdadero_falso' && (
            <>
              <input type="radio" id={`verdadero-${pregunta.id}`} name={`pregunta-${pregunta.id}`} value="true" onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)} />
              <label htmlFor={`verdadero-${pregunta.id}`}>Verdadero</label>
              <input type="radio" id={`falso-${pregunta.id}`} name={`pregunta-${pregunta.id}`} value="false" onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)} />
              <label htmlFor={`falso-${pregunta.id}`}>Falso</label>
            </>
          )}
          {pregunta.tipo === 'abierta' && <Input type="text" placeholder="Tu respuesta" onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)} />}
        </div>
      ))}
      <Button onClick={finalizarQuiz}>Finalizar Quiz</Button>
      {mostrarResultados && (
        <div>
          <h3>Resultados del Quiz</h3>
          <p>Calificación: {calcularCalificacion()} / {preguntas.length}</p>
        </div>
      )}
    </ContenedorQuiz>
  );
}

export default VistaPreviaQuiz;
