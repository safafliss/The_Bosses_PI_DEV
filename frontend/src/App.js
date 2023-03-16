import './App.css';
import Profil from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterPartner from './pages/RegisterPartner';
import Admin from './pages/Dashboard';
import PrivateRouter from './components/PrivateRouter';
import store from './redux/store';
import jwt_decode from 'jwt-decode';
//import {  setUser } from './redux/actions/authActions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import NoAccess from './pages/NoAccess';
import AdminRouter from './components/AdminRouter';
import ForceRedirect from './components/ForceRedirect';
import { setUser } from './redux/actions/authActions';
import { useSelector } from 'react-redux';
// Dashboard imports
import Sidebar from './components/ReusableComponents/components/Sidebar/Sidebar';
import AdminNavbar from './components/ReusableComponents/components/Navbars/AdminNavbar';
import HeaderStats from './components/ReusableComponents/components/Headers/HeaderStats';
import FooterAdmin from './components/ReusableComponents/components/Footers/FooterAdmin';
import { setAuth } from './util/setAuth';
import { Logout } from './redux/actions/authActions';
import Profile from './pages/Profile';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/styles/tailwind.css';

if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt);
  store.dispatch(setUser(decode));
  setAuth(window.localStorage.jwt);
  const currentDate = Date.now / 1000;

  if (decode.exp > currentDate) {
    store.dispatch(Logout());
  }
}

function App() {
  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
  };
  return (
    <BrowserRouter>
      <div className="bg-light" style={{ height: '100vh' }}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRouter user={user}>
                <Profil />
              </PrivateRouter>
            }
          />
          <Route
            path="/admin/profile/:id"
            element={
              <PrivateRouter user={user}>
                <Profil user = {user} />
              </PrivateRouter>
            }
          />
          <Route
            path="/login"
            element={
              <ForceRedirect user={user}>
                <Login />
              </ForceRedirect>
            }
          />

          <Route
            path="/register"
            element={
              <ForceRedirect user={user}>
                <Register />
              </ForceRedirect>
            }
          />

          <Route
            path="/registerPartner"
            element={
              <PrivateRouter user={user}>
                <RegisterPartner />
              </PrivateRouter>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRouter user={user}>
                <Sidebar />
                <div className="relative md:ml-64 bg-blueGray-100">
                  <AdminNavbar />
                  {/* Header */}
                  <HeaderStats />
                  <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Admin />
                    <FooterAdmin />
                  </div>
                </div>
              </AdminRouter>
            }
          />
          <Route path="/admin/profiles/" element={<Profile user={user} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/accesDenied" element={<NoAccess />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
