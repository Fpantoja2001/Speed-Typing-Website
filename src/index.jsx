import './App.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter as Router,Route,Routes} from "react-router-dom";
import BugReport from './components/bugreport';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ReleaseNotes from './components/releasenotes';
// import Landing from './components/landing';
// import PracticeMode from './components/landing';
import Landing from './components/landing';
import {isMobile} from 'react-device-detect';

function App() {
  if (isMobile) {
    return(
      <div className='mobileApp'>
        <h1>This game has unfortunately not been optimized for mobile yet. Open this on your desktop to access the website. <br /><br />08/22/2023</h1>
      </div>
      
    )
  } else {
    return (
      <div className='app'>
        <div className='sections'>
          <Navbar/>
          
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/releaseNotes' element={<ReleaseNotes/>}/>
            <Route path='/bugReport' element={<BugReport/>}/>
          </Routes>

          <Footer/>
        </div>
      </div>
    );
  }
  
}

ReactDOM.createRoot(document.getElementById('root')).render(<Router><App/></Router>)


