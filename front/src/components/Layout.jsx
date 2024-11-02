import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ticker from "./Ticker";
import Header from "./Header";
import Footer from "./Footer";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Ticker />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
