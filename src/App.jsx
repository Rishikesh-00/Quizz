// import { useState } from 'react'
// import AdminPanel from './components/AdminPanel'
import React, { useState } from 'react';
import AdminPanel from './components/AdminPanel';
import QuizList from './components/QuizList';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div className="container my-0 mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Quiz Platform</h1>
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          {isAdmin ? 'User Mode' : 'Admin Mode'}
        </button>
      </header>
      {isAdmin ? <AdminPanel /> : <QuizList />}
    </div>
  )
}

export default App
