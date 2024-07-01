import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <main>
        <Outlet/>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;