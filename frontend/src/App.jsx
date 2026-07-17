import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/HomePage/Homepage';
import UserContext from './context/User_context/UserContext';
import ImageGenerator from './Components/ImageGenerator';
import HomePage_ from './Pages/AI_HomePage/HomePage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route 
          path="/home" 
          element={
            // <UserContext>
              <HomePage_ />
            // </UserContext>
          } 
        />
        {/* <Route 
          path="/" 
          element={
            <UserContext>
              <Homepage />
            </UserContext>
          } 
        /> */}
        {/* <Route path="/AIGen" element={<ImageGenerator />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
