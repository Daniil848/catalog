import React from 'react';
import { Routes } from 'react-router-dom';
import Header from './components/header/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes></Routes>
    </div>
  );
}

export default App;
