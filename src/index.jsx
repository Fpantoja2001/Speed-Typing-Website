import './App.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter as Router,Route,Routes} from "react-router-dom";
import PracticeMode from './components/practicemode';
import BugReport from './components/bugreport';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ReleaseNotes from './components/releasenotes';

function App() {
  return (
    <div className='app'>
      <div className='sections'>
        <Navbar/>
        
        <Routes>
          <Route path='/' element={<PracticeMode/>}/>
          <Route path='/releaseNotes' element={<ReleaseNotes/>}/>
          <Route path='/bugReport' element={<BugReport/>}/>
        </Routes>

        <Footer/>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Router><App/></Router>)


