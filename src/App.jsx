import logo from './logo.svg';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from 'react';
import SignupLogin from './components/users/Login';
import { Outlet } from 'react-router-dom';
import Introduction from './components/Introduction';
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