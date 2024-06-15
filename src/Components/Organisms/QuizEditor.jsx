import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Atoms/Button';
import Input from '../Atoms/Input';

const ContenedorEditor = styled.div`
  background-color: #fff;
  padding: 50px;
  border-radius: 5px;
`;

function EditorQuiz({ onAgregarPregunta }) {
  const [preguntaActual, setPreguntaActual] = useState({
    id: 1,
    titulo: '',
    tipo: 'opcion_multiple',
    opciones: ['a)', 'b)', 'c)'],
    respuestasCorrectas: [], 
  });

  const agregarPregunta = () => {
    if (preguntaActual.tipo !== 'abierta' && preguntaActual.respuestasCorrectas.length === 0) {
      alert('Por favor selecciona la respuesta correcta.');
      return;
    }

    if (preguntaActual.tipo === 'abierta' && preguntaActual.respuestasCorrectas.length === 0) {
      alert('Por favor ingresa la respuesta correcta.');
      return;
    }

    onAgregarPregunta(preguntaActual);

    setPreguntaActual({
      id: preguntaActual.id + 1,
      titulo: '',
      tipo: 'opcion_multiple',
      opciones: ['a)', 'b)', 'c)'],
      respuestasCorrectas: [],
    });
  };

  const setRespuestaCorrecta = (opcion) => {
    setPreguntaActual({
      ...preguntaActual,
      respuestasCorrectas: [opcion],
    });
  };

  const handleOpcionChange = (index, value) => {
    let opcionesActualizadas = [...preguntaActual.opciones];
    opcionesActualizadas[index] = value;
    setPreguntaActual({ ...preguntaActual, opciones: opcionesActualizadas });
  };


  return (
    <ContenedorEditor>
      <h2>Editor de Quiz</h2>
      <Input id="question" type="text" placeholder="Escribe la pregunta" value={preguntaActual.titulo} onChange={(e) => setPreguntaActual({ ...preguntaActual, titulo: e.target.value })} />
      <div>
        <label>
          <input type="radio" value="opcion_multiple" checked={preguntaActual.tipo === 'opcion_multiple'} onChange={(e) => setPreguntaActual({ ...preguntaActual, tipo: e.target.value })} />
          Opción múltiple
        </label>
        <label>
          <input type="radio" value="verdadero_falso" checked={preguntaActual.tipo === 'verdadero_falso'} onChange={(e) => setPreguntaActual({ ...preguntaActual, tipo: e.target.value })} />
          Verdadero/Falso
        </label>
        <label>
          <input type="radio" value="abierta" checked={preguntaActual.tipo === 'abierta'} onChange={(e) => setPreguntaActual({ ...preguntaActual, tipo: e.target.value })} />
          Abierta
        </label>
      </div>
      {preguntaActual.tipo === 'opcion_multiple' &&
        preguntaActual.opciones.map((opcion, index) => (
          <div key={index}>
            <Input type="text" placeholder={`Opción ${index + 1}`} value={opcion} onChange={(e) => handleOpcionChange(index, e.target.value)} />
            <label>
              <input type="radio" name="respuestaCorrecta" checked={preguntaActual.respuestasCorrectas.includes(opcion)} onChange={() => setRespuestaCorrecta(opcion)} />
              Correcta
            </label>
          </div>
        ))}
      {preguntaActual.tipo === 'verdadero_falso' && (
        <div>
          <label>
            <input type="radio" name="respuestaCorrecta" value="true" checked={preguntaActual.respuestasCorrectas.includes('true')} onChange={() => setRespuestaCorrecta('true')} />
            Verdadero
          </label>
          <label>
            <input type="radio" name="respuestaCorrecta" value="false" checked={preguntaActual.respuestasCorrectas.includes('false')} onChange={() => setRespuestaCorrecta('false')} />
            Falso
          </label>
        </div>
      )}
      {preguntaActual.tipo === 'abierta' && (
        <div>
          <Input type="text" placeholder="Respuesta correcta" value={preguntaActual.respuestasCorrectas[0] || ''} onChange={(e) => setRespuestaCorrecta(e.target.value)} />
        </div>
      )}
      <Button onClick={agregarPregunta}>Agregar Pregunta</Button>
    </ContenedorEditor>
  );
}

export default EditorQuiz;
