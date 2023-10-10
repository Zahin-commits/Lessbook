import './index.css'
import { BrowserRouter as Router,Routes, Route, Outlet} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import {ProtectedRoute} from './components/ProtectedRoute'
import Test from './components/Test';
import { HomeScreen } from './screens/HomeScreen';
import { Profile } from './components/Profile';
import { EditProfile } from './components/EditProfile/EditProfile';
import { ShowFollowings } from './components/showFollowngs/ShowFollowings';
import { ShowFolloers } from './components/showFollowers/ShowFolloers';

function App() {

  return (
    <>
     <Router>
        <Routes>
          <Route path='' element={<ProtectedRoute/>}>
          <Route path='/' index={true} element={<HomeScreen/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/profile/:id/followings' element={<ShowFollowings/>}/>
          <Route path='/profile/:id/followers' element={<ShowFolloers/>}/>
          <Route path='/editProfile' element={<EditProfile/>}/>
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
