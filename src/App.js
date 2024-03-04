import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Results/>}/>
      </Routes>
    </div>
  );
}

export default App;
