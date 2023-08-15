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
import BugReport from './components/bugreport';

function App() {
  return (
  
    <div className="app">
      {/* hello */}
      
      <div className='sections'> 

        <Router>
          <Navbar/>
          <PracticeMode/>
          <Routes>
            {/* <Route path='/' element={<Home/>}/> */}
            {/* <Route path='/' element={<PracticeMode/>}/> */}
            <Route path='/bugReport' element={<BugReport/>}/>
          </Routes>
        </Router>
        
      </div>

    </div>
  );
}

export default App;
