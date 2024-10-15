import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Views/Home/home";
import Detalles from "./Views/Detalles/detalles"


function App() {


  return(
     <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Detalles />} />
      </Routes>
    </BrowserRouter>
  </div>
  )
  
}

export default App;