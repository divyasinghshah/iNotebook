
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './components/Home';
import { About } from './components/About';
import { Navbar } from './components/Navbar';
import NoteState from './context/notes/noteState';
function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Routes>
     
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path="/about" element={<About />} />
        
    </Routes>
    </BrowserRouter>
    </NoteState>
    </>
   
  );
}

export default App;
