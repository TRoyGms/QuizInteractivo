import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import QuizCreate from './Pages/QuizCreate'
import ResolverQuiz from './Pages/ResolverQuiz'
import ResultadosQuiz from './Pages/ResultadosQuiz'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuizCreate />,
  },
  {
    path: "/quiz_create",
    element: <QuizCreate />,
  },
  {
    path: "/quiz",
    element: <ResolverQuiz />,
  },
  {
    path: "/results",
    element: <ResultadosQuiz />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
