import './index.css'
import { BrowserRouter as Router,Routes, Route, Outlet} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import {ProtectedRoute} from './components/ProtectedRoute'
import Test from './components/Test';
import { HomeScreen } from './screens/HomeScreen';

function App() {

  return (
    <>
     <Router>
        <Routes>
          <Route path='' element={<ProtectedRoute/>}>
          <Route path='/' index={true} element={<HomeScreen/>}/>
          </Route>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/test' element={<Test/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
