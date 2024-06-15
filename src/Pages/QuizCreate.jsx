import React, { useState } from 'react';
import EditorQuiz from '../Components/Organisms/QuizEditor';
import Button from '../Components/Atoms/Button';
import { useNavigate } from 'react-router-dom';
import './crear.css'

function QuizCreate({ onAgregarPregunta }) {
  const [preguntas, setPreguntas] = useState([]);
  const navigate = useNavigate();

  const handleAgregarPregunta = (pregunta) => {
    setPreguntas([...preguntas, pregunta]);
  };

  const handleClickQuiz = () => {
    navigate('/quiz', { state: { preguntas } });
  };

  return (
    <div id='create_quiz'>
      <h1>Crear Quiz</h1>
      <EditorQuiz onAgregarPregunta={handleAgregarPregunta} />
      <Button onClick={handleClickQuiz}>Mostrar Quiz</Button>
    </div>
  );
}

export default QuizCreate;
