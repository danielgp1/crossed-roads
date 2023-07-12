import './App.css';
import Welcome from './components/welcome-page/Welcome';
import Homepage from './components/homepage/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Service from './components/service/Service';
import Garage from './components/garage/Garage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/service" element={<Service />} />
        <Route path="/garage" element={<Garage />} />
      </Routes>
    </Router>
  );
};
export default App;
