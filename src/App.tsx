import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import './App.css';
import HomePage from './pages/homePage/HomePage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
