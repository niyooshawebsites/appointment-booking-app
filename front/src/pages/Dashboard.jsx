import Appointments from "../components/Appointments";
import AppointmentDetails from "../components/AppointmentDetails";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import AboutForm from "../components/AboutForm";
import ContactForm from "../components/ContactForm";
import ServiceForm from "../components/ServiceForm";
import Highlights from "../components/Highlights";
import UsersInfo from "../components/UsersInfo";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const {
    showHighlights,
    showAllUsers,
    showServices,
    showProfile,
    showAbout,
    showContact,
    showAppointmentDetails,
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

  if (showAllUsers) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar />
          <UsersInfo />
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
