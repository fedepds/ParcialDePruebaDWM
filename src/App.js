import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./programa/home";
import Detalles from "./programa/detalles"


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