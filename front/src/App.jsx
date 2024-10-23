import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appointment from "./pages/Appointment";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VeriryEmail from "./pages/VeriryEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import GlobalStore from "./store/GlobalStore";
import { Provider } from "react-redux";
import ProtectedContent from "./components/ProtectedContent";
import axios from "axios";

const App = () => {
  const [serviceProvider, setServiceProvider] = useState(false);

  // getting the username from url
  const path = window.location.pathname;
  let username = path.split("/")[1];

  if (
    username == "register" ||
    username == "login" ||
    username == "about" ||
    username == "contact" ||
    username == "verify-email" ||
    username == "forgot-password" ||
    username == "reset-password" ||
    username == ""
  ) {
    username = "abs";
  }

  const checkUser = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/checkUser/${username}`)
      .then((res) => {
        setServiceProvider(res.data.success);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Provider store={GlobalStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {username != "abs" ? (
            <>
              <Route
                path={`/${username}`}
                element={
                  serviceProvider ? (
                    <Appointment serviceProvider={serviceProvider} />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route
                path={`/${username}/about`}
                element={serviceProvider ? <About /> : <NotFound />}
              />

              <Route path={`/${username}/*`} element={<NotFound />} />
            </>
          ) : (
            <>
              <Route
                path={`/about`}
                element={serviceProvider ? <About /> : <NotFound />}
              />
            </>
          )}

          <Route path="/login" element={<Login />} />
          <Route path={`/${username}/login`} element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route
            path={username != "abs" ? `/${username}/register` : "/register"}
            element={<Register />}
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VeriryEmail />} />

          <Route element={<ProtectedContent />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route
              path={username != "abs" ? `/${username}/dashboard` : "/dashboard"}
              element={<Dashboard />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
