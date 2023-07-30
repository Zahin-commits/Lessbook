import './index.css'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Test from './components/Test';

function App() {

  return (
    <>
     <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/test' element={<Test/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
