import Login from './component/login/index';
import ChatRoom from './component/ChatRoom/index';
import AddRoomModal from './component/Modals/AddRoomModal';
import InviteMemberModal from './component/Modals/InviteMemberModal';
import AuthProvier from './context/AuthProvier';
import AppProvider from './context/AppProvider';
import SignUp from './component/login/SignUp';
import LoginWithPass from './component/login/LoginWithPass';
import './App.css';

import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <AuthProvier>
      <AppProvider>

      <Routes>
      <Route element={<Login />} path="/login" /> 
        <Route element={<ChatRoom />} path="/" /> 

      </Routes>
    <InviteMemberModal/>
      <AddRoomModal/>
      <SignUp/>
    <LoginWithPass/>

      </AppProvider>
    </AuthProvier>
    

    
     
    
   
  );
}

export default App;
