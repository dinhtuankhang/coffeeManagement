import logo from './logo.svg';
import './App.css';
import { Card } from './components/Card/Card';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from 'react';
import AutoFocus from './components/Card/AutoFocus';
import BTVN9 from './excercise/BTVN9';
import Clock from './excercise/Clock';
import API from './excercise/API';
import Login from './excercise/Login';
import Signup from './excercise/Signup';
import { Outlet } from 'react-router-dom';
import Header from './excercise/Header';
function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Outlet/>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;