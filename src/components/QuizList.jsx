// src/components/QuizList.jsx
import React, { useEffect, useState } from "react";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    setQuizzes(storedQuizzes);
    const savedProgress = JSON.parse(
      localStorage.getItem("quizProgress") || "null"
    );
    if (savedProgress) {
      setSelectedQuiz(savedProgress.selectedQuiz);
      setAnswers(savedProgress.answers);
      setSubmitted(savedProgress.submitted);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "quizProgress",
      JSON.stringify({ selectedQuiz, answers, submitted })
    );
  }, [selectedQuiz, answers, submitted]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const quiz = quizzes[selectedQuiz];
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 4; // Correct answer
      } else {
        score -= 1; // Incorrect answer
      }
    });
    setScore(score);
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    calculateScore();
  };

  if (selectedQuiz === null) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Select a Quiz</h2>
        <h3 className="text-xl  mb-4">This quiz have negative marking so answer carefully eg: +4 for each correct answer and -1 for each wrong answer</h3>
        {quizzes.map((quiz, index) => (
          <button
            key={index}
            onClick={() => setSelectedQuiz(index)}
            className="block bg-blue-500 text-white p-2 rounded-md mb-2"
          >
            {quiz.title}
          </button>
        ))}
      </div>
    );
  }

  const quiz = quizzes[selectedQuiz];
  return (
    <div className="p-4">
        <h3 className="text-xl  mb-4">This quiz have negative marking so answer carefully eg: +4 for each correct answer and -1 for each wrong answer</h3>
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
      {quiz.questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mb-4">
          <h3 className="text-lg font-medium">{question.questionText}</h3>
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex} className="block">
              <input
                type="radio"
                name={`question-${questionIndex}`}
                checked={answers[questionIndex] === optionIndex}
                onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                disabled={submitted}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      {!submitted && (
        <button
          onClick={handleSubmitQuiz}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Submit Quiz
        </button>
      )}
      {submitted && (
        <div>
          <h3 className="text-xl font-bold mt-4">Results</h3>
          <p className="text-2xl">Your Score: {score}</p>
          <ul>
            {quiz.questions.map((question, questionIndex) => (
              <li key={questionIndex}>
                <p>Q. {question.questionText}</p>
                <p className="text-blue-800">
                  Your Answer: {question.options[answers[questionIndex]]}
                </p>
                <p
                  className={
                    question.options[answers[questionIndex]] ===
                    question.options[question.correctAnswer]
                      ? "text-green-700"
                      : "text-red-700"
                  }
                >
                  Correct Answer: {question.options[question.correctAnswer]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizList;
