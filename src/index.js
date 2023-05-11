import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import './index.css';

import Home from './pages/Home/Home';
import Rent from "./pages/Rent/Rent";
import Custom from "./pages/Custom/Custom";
import Appointment from "./pages/Appointment/Appointment";
import About from "./pages/About/About";
import Detail from "./pages/Detail/Detail";
import SupportAdmin from '../src/SupportEngine';

import SupportEngine from '../src/SupportEngine';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/support" element={<SupportAdmin />} />
      </Routes>
      <SupportEngine />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
