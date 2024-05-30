import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<Coin />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
