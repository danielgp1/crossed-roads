import React from 'react';
import './App.css';
import Welcome from './components/welcome-page/Welcome';
import Homepage from './components/homepage/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Welcome Page - This is the default route */}
        <Route path="/" element={<Welcome />} />
        {/* Route for  Homepage */}
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
};
export default App;
