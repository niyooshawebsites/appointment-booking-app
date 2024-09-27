import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appointment from "./pages/Appointment";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VeriryEmail from "./pages/VeriryEmail";
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
              <Route
                path={`/${username}/contact`}
                element={serviceProvider ? <Contact /> : <NotFound />}
              />
            </>
          ) : (
            <>
              <Route
                path={`/about`}
                element={serviceProvider ? <About /> : <NotFound />}
              />
              <Route
                path={`/contact`}
                element={serviceProvider ? <Contact /> : <NotFound />}
              />
            </>
          )}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VeriryEmail />} />
          <Route element={<ProtectedContent />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
