import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appointment from "./pages/Appointment";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VeriryEmail from "./pages/VeriryEmail";
import GlobalStore from "./store/GlobalStore";
import { Provider } from "react-redux";
import ProtectedContent from "./components/ProtectedContent";

const App = () => {
  const path = window.location.pathname;
  const username = path.split("/")[1];

  return (
    <Provider store={GlobalStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/${username}`} element={<Appointment />} />
          <Route path={`/${username}/about`} element={<About />} />
          <Route path={`/${username}/contact`} element={<Contact />} />
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
