import React from 'react';
import { useLocation } from 'react-router-dom';
import './resultados.css'

function ResultadosQuiz() {
  const location = useLocation();
  const { calificacion, total, respuestasUsuario } = location.state;

  return (
    <div id='results_quiz'>
      <h2>Resultados del Quiz</h2>
      <div id='respuestas'>
      <div id='calificacion'>
      <p>Calificación: {calificacion} / {total}</p>
      </div>
        <h3>Respuestas del usuario:</h3>
        <pre>{JSON.stringify(respuestasUsuario, null, 2)}</pre>
      </div>
    </div>
  );
}

export default ResultadosQuiz;
