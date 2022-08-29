/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyApp from './component/Myapp';
import './App.css';

function App() {
  useEffect(() => {
    localStorage.setItem('menuId', '');
  }, []);
  return (
    <BrowserRouter>
      <MyApp />
    </BrowserRouter>
  );
}

export default App;
