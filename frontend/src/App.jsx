import React from 'react';
import { useState } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './Pages/HomePage/Homepage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path={"/"} element={<Homepage/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
