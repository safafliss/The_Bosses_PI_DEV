import './App.css';
import Associationpage from './pages/Associationpage';
import Particularpage from './pages/Particularpage';
import Proffpage from './pages/Proffpage';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterPartner from './pages/RegisterPartner';
import Admin from './pages/Dashboard';
import PrivateRouter from './components/PrivateRouter';
import store from './redux/store';
import jwt_decode from 'jwt-decode';
import NotFound from './pages/NotFound';
import NoAccess from './pages/NoAccess';
import AdminRouter from './components/AdminRouter';
import ForceRedirect from './components/ForceRedirect';
import { setUser } from './redux/actions/authActions';
import { useSelector } from 'react-redux';
import VerifSend from './pages/VerifSend';
import VerifSuccess from './pages/VerifSuccess';
import VerifFail from './pages/VerifFail';
import CheckVerif from './pages/CheckVerif';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Dashboard imports
import Sidebar from './components/ReusableComponents/components/Sidebar/Sidebar';
import AdminNavbar from './components/ReusableComponents/components/Navbars/AdminNavbar';
import HeaderStats from './components/ReusableComponents/components/Headers/HeaderStats';
import FooterAdmin from './components/ReusableComponents/components/Footers/FooterAdmin';
import { setAuth } from './util/setAuth';
import { Logout } from './redux/actions/authActions';
import Profile from './pages/Profile';
import CardListRatings  from './components/ReusableComponents/components/Cards/CardListRatings';
import CardListReports from './components/ReusableComponents/components/Cards/CardListReports';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/styles/tailwind.css';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import FormParticulier from './pages/FormParticulier';
import FormProfessional from './pages/FormProfessional';
import FormAssociation from './pages/FormAssociation';
import FormLivreur from './pages/FormLivreur';
import FormTrash from './pages/FormTrash';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoggedFBG from './pages/LoggedFBG';
import { useEffect, useState } from 'react';
import SupportCenter from './pages/SupportCenter';
import SideButton from './pages/sideButton';
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
  const [user1, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3600/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  console.log(user1)
  return (
    <BrowserRouter>
      <div className="bg-light" style={{ height: '100vh' }}>
        <Routes>
          <Route
            path="/"
            element={<PrivateRouter user={user}></PrivateRouter>}
          />
          {/* <Route
            path="/profile"
            element={<PrivateRouter user={user}></PrivateRouter>}
          />
          <Route
            path="/particpage"
            element={<PrivateRouter user={user}></PrivateRouter>}
          />
          <Route
            path="/associpage"
            element={<PrivateRouter user={user}></PrivateRouter>}
          />
          <Route
            path="/proffpage"
            element={<PrivateRouter user={user}></PrivateRouter>}
          /> */}
          {/* <Route path="/"> */}
          {/* <Route path="/proffpage" element={<Proffpage />} />
            <Route path="/particpage" element={<Particularpage />} />
            <Route path="/associpage" element={<Associationpage />} />
            <Route path="/profile" element={<Profile />} /> */}
          {/* </Route> */}

          <Route
            path="/admin/profile/:id"
            element={
              <AdminRouter user={user}>
                <Profile user={user} />
              </AdminRouter>
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
           <Route
            path="/admin/listOfRatings"
            element={
              <>
              <AdminRouter user={user}>
                <Sidebar />
                <div className="relative md:ml-64 bg-blueGray-100">
              
                  {/* Header */}
                  <HeaderStats />
                  <div className="px-4 md:px-10 mx-auto w-full -m-24">
                   <CardListRatings/>
                    <FooterAdmin />
                  </div>
                </div>
                </AdminRouter>
                </>
            }
          />
            <Route
            path="/admin/listOfReports"
            element={
              <>
              <AdminRouter user={user}>
                <Sidebar />
                <div className="relative md:ml-64 bg-blueGray-100">
              
                  {/* Header */}
                  <HeaderStats />
                  <div className="px-4 md:px-10 mx-auto w-full -m-24">
                   <CardListReports/>
                    <FooterAdmin />
                  </div>
                </div>
                </AdminRouter>
                </>
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
              <LoggedFBG  user1={user1}/>
              // </ForceRedirect>
            }
          />

          <Route
            path="/forgotPassword"
            element={
              <ForceRedirect user={user}>
                <ForgotPassword />
              </ForceRedirect>
            }
          />

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
            path="/support"
            element={<SupportCenter user1={user1} />}
          />

              
            <Route
            path="/rate"
            element={<SideButton user1={user1} user={user}/>}
          />
          <Route
            path="/formLivreur/:id"
            element={<FormLivreur user={user} />}
          />
          <Route path="/formTrash/:id" element={<FormTrash user={user} />} />
          {/* <Route path="/profile" element={<Profile user={user} />} />*/}
          <Route path="/admin/profiles/" element={<Profile user={user} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/accesDenied" element={<NoAccess />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
