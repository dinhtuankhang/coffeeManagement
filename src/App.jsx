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
function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Signup/>
      {/* <API/> */}
    </div>
  );
}

export default App;