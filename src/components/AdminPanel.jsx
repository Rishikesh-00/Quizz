// src/components/AdminPanel.jsx
import React, { useState } from 'react';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  const handleAddQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({ questionText: '', options: ['', '', '', ''], correctAnswer: 0 });
  };

  const handleSubmitQuiz = () => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    quizzes.push({ title, questions });
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    setTitle('');
    setQuestions([]);
  };

  return (
    <form className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Quiz Title</label>
        <input
        required
          type="text"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Question</label>
        <input
        required
          type="text"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={currentQuestion.questionText}
          onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
        />
      </div>
      {currentQuestion.options.map((option, index) => (
        <div key={index} className="mb-2">
          <label className="block text-sm font-medium">Option {index + 1}</label>
          <input
          required
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={option}
            onChange={(e) => {
              const newOptions = [...currentQuestion.options];
              newOptions[index] = e.target.value;
              setCurrentQuestion({ ...currentQuestion, options: newOptions });
            }}
          />
        </div>
      ))}
      <div className="mb-4">
        <label className="block text-sm font-medium">Correct Answer</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={currentQuestion.correctAnswer}
          onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: parseInt(e.target.value) })}
        >
          {currentQuestion.options.map((_, index) => (
            <option key={index} value={index}>
              Option {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddQuestion} className="bg-blue-500 text-white p-2 rounded-md">Add Question</button>
      <button onClick={handleSubmitQuiz} className="bg-green-500 text-white p-2 rounded-md ml-2">Submit Quiz</button>
      <h3 className="text-xl font-bold mt-4">Questions</h3>
      <ul>
        {questions.map((q, index) => (
          <li key={index}>{q.questionText}</li>
        ))}
      </ul>
    </form>
  );
};

export default AdminPanel;
