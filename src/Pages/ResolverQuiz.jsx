import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Components/Atoms/Button';
import Input from '../Components/Atoms/Input';
import './resolver.css'

function ResolverQuiz() {
  const location = useLocation();
  const preguntas = location.state.preguntas;
  const [respuestasUsuario, setRespuestasUsuario] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const navigate = useNavigate();

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
        const respuestaCorrecta = pregunta.respuestasCorrectas[0];
        const respuestaUsuario = respuestasUsuario[pregunta.id];
        if (respuestaUsuario === respuestaCorrecta) {
          calificacion++;
        }
      } else if (pregunta.tipo === 'abierta') {
        const respuestaCorrecta = pregunta.respuestasCorrectas[0].toLowerCase().trim();
        const respuestaUsuario = respuestasUsuario[pregunta.id]?.toLowerCase().trim();
        if (respuestaUsuario === respuestaCorrecta) {
          calificacion++;
        }
      }
    });
    return calificacion;
  };

  const finalizarQuiz = () => {
    setMostrarResultados(true);
    navigate('/results', {
      state: {
        calificacion: calcularCalificacion(),
        total: preguntas.length,
        respuestasUsuario,
      },
    });
  };

  return (
    <div id='on_quiz'>
      <h2>Resolver Quiz</h2>
      <div id='fondito'>
      {preguntas.map((pregunta) => (
        <div key={pregunta.id}>
          <h3>{pregunta.titulo}</h3>
          {pregunta.tipo === 'opcion_multiple' && (
            <>
              {pregunta.opciones.map((opcion, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`opcion-${pregunta.id}-${index}`}
                    name={`pregunta-${pregunta.id}`}
                    value={opcion}
                    onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)}
                  />
                  <label htmlFor={`opcion-${pregunta.id}-${index}`}>{opcion}</label>
                </div>
              ))}
            </>
          )}
          {pregunta.tipo === 'verdadero_falso' && (
            <>
              <input
                type="radio"
                id={`verdadero-${pregunta.id}`}
                name={`pregunta-${pregunta.id}`}
                value="true"
                onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)}
              />
              <label htmlFor={`verdadero-${pregunta.id}`}>Verdadero</label>
              <input
                type="radio"
                id={`falso-${pregunta.id}`}
                name={`pregunta-${pregunta.id}`}
                value="false"
                onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)}
              />
              <label htmlFor={`falso-${pregunta.id}`}>Falso</label>
            </>
          )}
          {pregunta.tipo === 'abierta' && (
            <Input
              type="text"
              placeholder="Tu respuesta"
              onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)}
            />
          )}
        </div>
      ))}
      <Button onClick={finalizarQuiz}>Finalizar Quiz</Button>
      {mostrarResultados && (
        <div>
          <h3>Resultados del Quiz</h3>
          <p>Calificación: {calcularCalificacion()} / {preguntas.length}</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default ResolverQuiz;
