import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import Typewriter from './components/Typewriter';
import Landing from './pages/Landing';

function App() {
  return (
    <div className="App">
      <br />
    
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/result' element={<Results/>}/>
      </Routes>
    </div>
  );
}

export default App;
