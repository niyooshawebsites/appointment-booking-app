import AppointmentDetails from "../components/AppointmentDetails";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import AboutForm from "../components/AboutForm";
import ContactForm from "../components/ContactForm";
import ServiceForm from "../components/ServiceForm";
import Highlights from "../components/Highlights";
import DisplayInfo from "../components/DisplayInfo";
import { useSelector } from "react-redux";
import AppointmentForm from "../components/AppointmentForm";

const Dashboard = () => {
  const {
    showHighlights,
    showInfo,
    showServices,
    showProfile,
    showAbout,
    showContact,
    showAppointmentDetails,
    showBookAppointment,
  } = useSelector((state) => state.dashboard_Options_Slice);

  if (showHighlights) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar />
          <Highlights />
        </div>
      </Layout>
    );
  }

  if (showInfo) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar />
          <DisplayInfo />
        </div>
      </Layout>
    );
  }

  if (showBookAppointment) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar />
          <AppointmentForm />
        </div>
      </Layout>
    );
  }

  if (showAppointmentDetails) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar />
          <AppointmentDetails />
        </div>
      </Layout>
    );
  }

  if (showServices) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar />
          <ServiceForm />
        </div>
      </Layout>
    );
  }

  if (showProfile) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar />
          <Profile />
        </div>
      </Layout>
    );
  }

  if (showAbout) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar />
          <AboutForm />
        </div>
      </Layout>
    );
  }

  if (showContact) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar />
          <ContactForm />
        </div>
      </Layout>
    );
  }
};

export default Dashboard;
