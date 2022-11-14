 
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './containers/home';
import Login from './containers/adminlogin';

import Dashboard from './containers/dashboard';
import Mybookings from './containers/mybookings';
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="admin" element={<Login />} /> 
          <Route path="admindashboard" element={<Dashboard />} /> 
          <Route path="bookings" element={<Mybookings />} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
