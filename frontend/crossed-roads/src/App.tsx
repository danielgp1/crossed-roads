import './App.css';
import Welcome from './components/welcome-page/Welcome';
import Homepage from './components/homepage/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Service from './components/service/Service';
import Garage from './components/garage/Garage';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import PageNotFound from './components/page-not-found/PageNotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route element={<ProtectedRoutes/>} >
          <Route path="/" element={<Homepage />} />
          <Route path="/service" element={<Service />} />
          <Route path="/garage" element={<Garage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
