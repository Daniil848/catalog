import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/header/Header';
import HomePage from './pages/homePage/HomePage';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Footer />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
