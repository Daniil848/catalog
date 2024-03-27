import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/header/Header';
import HomePage from './pages/homePage/HomePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
