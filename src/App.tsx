import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/header/Header';
import HomePage from './pages/homePage/HomePage';
import ProductsSummary from './components/productsSummary/ProductsSummary';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <ProductsSummary />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
