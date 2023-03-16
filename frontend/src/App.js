import "./App.css";
import Associationpage from "./pages/Associationpage";
import Particularpage from "./pages/Particularpage";
import Proffpage from "./pages/Proffpage";
import Profil from "./pages/Profil";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterPartner from "./pages/RegisterPartner";
import Admin from "./pages/Dashboard";
import PrivateRouter from "./components/PrivateRouter";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
//import {  setUser } from './redux/actions/authActions';
import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import NotFound from "./pages/NotFound";
import NoAccess from "./pages/NoAccess";
import AdminRouter from "./components/AdminRouter";
import ForceRedirect from "./components/ForceRedirect";
import { setUser } from "./redux/actions/authActions";
import { useSelector } from "react-redux";
import Login1 from "./pages/Login1";
import Register1 from "./pages/Register1";
import VerifSend from "./pages/VerifSend";
import VerifSuccess from "./pages/VerifSuccess";
import VerifFail from "./pages/VerifFail";
import CheckVerif from "./pages/CheckVerif";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FormParticulier from "./pages/FormParticulier";
import { setAuth } from "./util/setAuth";
import FormProfessional from "./pages/FormProfessional";
import FormAssociation from "./pages/FormAssociation";
import FormLivreur from "./pages/FormLivreur";
import FormTrash from "./pages/FormTrash";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Profile from "./components/Profile";
import LoggedFBG from "./pages/LoggedFBG";
if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt);
  store.dispatch(setUser(decode));
  setAuth(window.localStorage.jwt);
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
          <Route path="/">
            <Route path="/proffpage" element={<Proffpage />} />
            <Route path="/particpage" element={<Particularpage />} />
            <Route path="/associpage" element={<Associationpage />} />
          </Route>
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
                <Admin />
              </AdminRouter>
            }
          />
          <Route
            path="/verification"
            element={
              // <ForceRedirect user={user}>
                <VerifSend />
              // </ForceRedirect>
            }
          />
          <Route
            path="/verify"
            element={
              // <ForceRedirect user={user}>
                <CheckVerif />
              // </ForceRedirect>
            }
          />
          <Route
            path="/verified"
            element={
              // <ForceRedirect user={user}>
                <VerifSuccess />
              // </ForceRedirect>
            }
          />
          <Route
            path="/notVerified"
            element={
              // <ForceRedirect user={user}>
                <VerifFail />
              // </ForceRedirect>
            }
            />
            <Route
            path="/logged"
            element={
              // <ForceRedirect user={user}>
                <LoggedFBG  />
              // </ForceRedirect>
            }
            />
          
           <Route path="/forgotPassword"
            element={
              <ForceRedirect user={user}>
                <ForgotPassword />
              </ForceRedirect>
            }/>
          
          <Route
            path="/resetPassword/:token"
            element={
              <ForceRedirect user={user}>
                <ResetPassword />
              </ForceRedirect>
            }
          />
          <Route
            path="/formPart/:id"
            element={<FormParticulier user={user} />}
          />
          <Route
            path="/formProf/:id"
            element={<FormProfessional user={user} />}
          />
          <Route
            path="/formAssoc/:id"
            element={<FormAssociation user={user} />}
          />
          <Route
            path="/formLivreur/:id"
            element={<FormLivreur user={user} />}
          />
          <Route path="/formTrash/:id" element={<FormTrash user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/accesDenied" element={<NoAccess />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
