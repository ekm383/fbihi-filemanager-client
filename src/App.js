import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { auth } from "./components/firebase/Firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Header from "./components/Header";
import Upload from "./components/Upload";
import Medicare from "./pages/Medicare";
import AlohaCare from "./pages/AlohaCare";
import HMSA from "./pages/HMSA";
import Humana from "./pages/Humana";
import Kaiser from "./pages/Kaiser";
import UnitedHealthcare from "./pages/UnitedHealthcare";
import Ohana from "./pages/Ohana";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";

const App = () => {
  const dispatch = useDispatch();

  // Check Firebase Auth State
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        // Persist Token in DB
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // Clean Up
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className='container'>
        <Header />
        <div className='main-content'>
          <ToastContainer />
          <Switch>
            <Route exact component={Register} path='/register' />
            <Route
              exact
              component={RegisterComplete}
              path='/register/complete'
            />
            <Route exact component={ForgotPassword} path='/forgot/password' />
            <Route exact component={Login} path='/' />
            <AdminRoute exact component={Upload} path='/upload' />
            <UserRoute exact component={Medicare} path='/medicare' />
            <UserRoute exact component={AlohaCare} path='/aloha-care' />
            <UserRoute exact component={HMSA} path='/hmsa' />
            <UserRoute exact component={Humana} path='/humana' />
            <UserRoute exact component={Kaiser} path='/kaiser' />
            <UserRoute
              exact
              component={UnitedHealthcare}
              path='/united-healthcare'
            />
            <UserRoute exact component={Ohana} path='/ohana' />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
