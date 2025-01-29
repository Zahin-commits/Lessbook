import './index.css'
import { BrowserRouter as Router,Routes, Route, Outlet} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import {ProtectedRoute} from './components/ProtectedRoute'
import { HomeScreen } from './screens/HomeScreen';
import { EditProfile } from './components/EditProfile/EditProfile';
import { ShowFollowings } from './components/showFollowngs/ShowFollowings';
import { ShowFolloers } from './components/showFollowers/ShowFolloers';
import { ShowFeed } from './components/showFeed/ShowFeed';
import { NotFound } from './screens/NotFound';
import { Profile } from './components/profile/Profile';

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
          <Route path='/feed' element={<ShowFeed/>}/>
          <Route path='/editProfile' element={<EditProfile/>}/>
          </Route>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
