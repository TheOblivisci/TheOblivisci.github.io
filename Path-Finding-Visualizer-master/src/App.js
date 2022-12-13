
import React from 'react';
import Sketch from 'react-p5';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/header';
import Feedback from './components/FeedBack/feedback';
import Thankyou from './components/ThankYou/thankyou';
import ComparePage from './components/ComparePage/comparePage';
import HomePage from './components/Home/home';
function App() {
  
  return  <div className='app'>
    <Header/>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/bfsalgo' element={<HomePage/>} />
        <Route path='/dfsalgo' element={<HomePage/>} />
        <Route path='/astaralgo' element={<HomePage/>} />
        <Route path='/dijkstraalgo' element={<HomePage/>} />
        <Route path='/greedybfsalgo' element={<HomePage/>} />
        <Route path='/comparepage' element={<ComparePage/>} />
        <Route path='/feedback' element={<Feedback/>} />
        <Route path='/thankyou' element={<Thankyou/>} />
      </Routes>
    </Router>

  </div>
}

export default App;
