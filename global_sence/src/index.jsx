import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/signup/Signup';
import Weather from './pages/weather/Weather';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />  
        <Route path="/weather" element={<Weather />} /> 
      </Routes>
    </BrowserRouter>
  );
}

