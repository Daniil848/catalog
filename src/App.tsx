import React from 'react';
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
    </div>
  );
}

export default App;
