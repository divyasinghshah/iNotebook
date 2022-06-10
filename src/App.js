
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './components/Home';
import { useState } from 'react';
import { About } from './components/About';
import { Navbar } from './components/Navbar';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
function App() {
  const [alert, setalert] = useState(null);
  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type

    });
    setTimeout(()=>{
      setalert(null);
    },1500);
  }
  return (
    <>
    
    <BrowserRouter>
    <Navbar/>
   
    <Alert alert={alert}/>
    <NoteState>
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
      <Route exact path="/home" element={<Home />}/>
      <Route exact path="/about" element={<About />} />
      <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
      <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
        
    </Routes>
    </div>
    </NoteState>
    </BrowserRouter>
    
    </>
   
  );
}

export default App;
