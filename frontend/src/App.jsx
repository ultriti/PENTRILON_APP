import React from 'react';
import { useState } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './Pages/HomePage/Homepage';
import UserContext from '../src/context/User_context/UserContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<><UserContext><Homepage /></UserContext></>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
