import './App.scss';
import React from 'react';
import Navbar from './components/navbar';
import Home from './components/home';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import PracticeMode from './components/practicemode';

function App() {
  return (
  
    <div className="app">
      
      <div className='sections'> 

        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/practice' element={<PracticeMode/>}/>
          </Routes>
        </Router>
        
      </div>

    </div>
  );
}

export default App;
