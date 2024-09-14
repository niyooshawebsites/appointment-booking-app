import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appointment from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VeriryEmail from "./pages/VeriryEmail";
import GlobalStore from "./store/GlobalStore";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={GlobalStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Appointment />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VeriryEmail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
