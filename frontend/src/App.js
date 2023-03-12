import "./App.css";
import Profil from "./pages/Profil";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterPartner from "./pages/RegisterPartner";
import Admin from "./pages/Dashboard";
import PrivateRouter from "./components/PrivateRouter";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
//import {  setUser } from './redux/actions/authActions';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import NoAccess from "./pages/NoAccess";
import AdminRouter from "./components/AdminRouter";
import ForceRedirect from "./components/ForceRedirect";
import { setUser } from "./redux/actions/authActions";
import { useSelector } from "react-redux";
import Login1 from "./pages/Login1";
import Register1 from "./pages/Register1";

if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt);
  store.dispatch(setUser(decode));
  // setAuth(window.localStorage.jwt)
  // const currentDate = Date.now / 1000

  // if(decode.exp >  currentDate){
  //  store.dispatch(Logout())
  // }
}

function App() {
  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
  };
  return (
    <BrowserRouter>
      <div className="bg-light" style={{ height: "100vh" }}>
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
            path="/login"
            element={
              <ForceRedirect user={user}>
                <Login1 />
              </ForceRedirect>
            }
          />

          

          <Route
            path="/register"
            element={
              <ForceRedirect user={user}>
                <Register1 />
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
                <Admin />
              </AdminRouter>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/accesDenied" element={<NoAccess />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
