import './App.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter as Router,Route,Routes} from "react-router-dom";
import PracticeMode from './components/practicemode';
import BugReport from './components/bugreport';
import Navbar from './components/navbar';

function App() {
  return (
    <div className='app'>
      <div className='sections'>
        <Navbar/>
        
        <Routes>
          <Route path='/' element={<PracticeMode/>}/>
          <Route path='/bugReport' element={<BugReport/>}/>
        </Routes>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Router><App/></Router>)


