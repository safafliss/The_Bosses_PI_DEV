
import './App.css';
import Profil from './pages/Profil';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterPartner from './pages/RegisterPartner';
import Admin from './pages/Dashboard';
import PrivateRouter from './components/PrivateRouter';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NotFound from './pages/NotFound';
import NoAccess from './pages/NoAccess';
import AdminRouter from './components/AdminRouter';
import ForceRedirect from './components/ForceRedirect';
function App() {
  const user = {
    isConnected: true,
    role: "ADMIN"
    
  }
  return (
    <BrowserRouter>
    <div className="bg-light" style={{height: "100vh"}}>
    
    <Routes>
     
          <Route path="/" element={
          <PrivateRouter user={user}>
            <Profil />
            </PrivateRouter>
       
        } />
          <Route path="/login" element={
            <ForceRedirect user={user}>
            <Login />
          </ForceRedirect>
        
        } />
          <Route path="/register" element={
          
          <ForceRedirect user={user}>
          <Register />
        </ForceRedirect>
         
        } />
        
         <Route path="/registerPartner" element={
           <PrivateRouter user={user}>
          <RegisterPartner />
          </PrivateRouter>
      } />
          <Route path="/admin" element={
           <AdminRouter user={user}>
            <Admin />
            </AdminRouter>
        } />
                  <Route path="*" element={
         
         <NotFound />

     } />
               <Route path="/accesDenied" element={
         
         <NoAccess />

     } />
        
    </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
