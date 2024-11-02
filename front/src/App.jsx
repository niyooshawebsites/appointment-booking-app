import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Appointment = lazy(() => import("./pages/Appointment"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const VeriryEmail = lazy(() => import("./pages/VeriryEmail"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
import GlobalStore from "./store/GlobalStore";
import { Provider } from "react-redux";
// import ProtectedContent from "./components/ProtectedContent";
const ProtectedContent = lazy(() => import("./components/ProtectedContent"));
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./components/Loader";

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
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/checkUser/${username}`
      );

      if (res.data.success) {
        setServiceProvider(res.data.success);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Provider store={GlobalStore}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
          />

          {username != "abs" ? (
            <>
              <Route
                path={`/${username}`}
                element={
                  serviceProvider ? (
                    <Suspense fallback={<Loader />}>
                      {/* <Appointment serviceProvider={serviceProvider} /> */}
                      <Home />
                    </Suspense>
                  ) : (
                    <Suspense fallback={<Loader />}>
                      <NotFound />
                    </Suspense>
                  )
                }
              />
              <Route
                path={`/${username}/about`}
                element={
                  serviceProvider ? (
                    <Suspense fallback={<Loader />}>
                      <About />
                    </Suspense>
                  ) : (
                    <Suspense fallback={<Loader />}>
                      <NotFound />
                    </Suspense>
                  )
                }
              />

              <Route
                path={`/${username}/*`}
                element={
                  <Suspense fallback={<Loader />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </>
          ) : (
            <>
              <Route
                path={`/about`}
                element={
                  serviceProvider ? (
                    <Suspense fallback={<Loader />}>
                      <About />
                    </Suspense>
                  ) : (
                    <Suspense fallback={<Loader />}>
                      <NotFound />
                    </Suspense>
                  )
                }
              />
            </>
          )}

          <Route
            path="/login"
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path={`/${username}/login`}
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />

          <Route
            path="/register"
            element={
              <Suspense fallback={<Loader />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path={username != "abs" ? `/${username}/register` : "/register"}
            element={
              <Suspense fallback={<Loader />}>
                <Register />
              </Suspense>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<Loader />}>
                <ForgotPassword />
              </Suspense>
            }
          />
          <Route
            path={
              username != "abs"
                ? `/${username}/forgot-password`
                : "/forgot-password"
            }
            element={
              <Suspense fallback={<Loader />}>
                <ForgotPassword />
              </Suspense>
            }
          />

          <Route
            path="/reset-password"
            element={
              <Suspense fallback={<Loader />}>
                <ResetPassword />
              </Suspense>
            }
          />
          <Route
            path={
              username != "abs"
                ? `/${username}/reset-password`
                : "/reset-password"
            }
            element={
              <Suspense fallback={<Loader />}>
                <ResetPassword />
              </Suspense>
            }
          />

          <Route
            path="/verify-email"
            element={
              <Suspense fallback={<Loader />}>
                <VeriryEmail />
              </Suspense>
            }
          />
          <Route
            path={
              username != "abs" ? `/${username}/verify-email` : "/verify-email"
            }
            element={
              <Suspense fallback={<Loader />}>
                <VeriryEmail />
              </Suspense>
            }
          />

          <Route
            element={
              <Suspense fallback={<Loader />}>
                <ProtectedContent />
              </Suspense>
            }
          >
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route
              path={username != "abs" ? `/${username}/dashboard` : "/dashboard"}
              element={
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
