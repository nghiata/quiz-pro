import React from 'react';

const ListQuiz = ({ quizs, deleteQuiz }) => {

  return (
    <ul>
      {
        quizs &&
          quizs.length > 0 ?
            (
              quizs.map(quiz => {
                return (
                  <li key={quiz._id} onClick={() => deleteQuiz(quiz._id)}>{quiz.action}</li>
                )
              })
            )
            :
            (
              <li>No quiz(s) left</li>
            )
      }
    </ul>
  )
}

export default ListQuiz