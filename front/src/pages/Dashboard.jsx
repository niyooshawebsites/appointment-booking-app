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
import LoginAppointmentForm from "../components/LoginAppointmentForm";
import { useState } from "react";
import LetterHead from "../components/LetterHead";
import Qualifications from "../components/Qualifications";
import Timings from "../components/Timings";

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
    loginBooking,
    showLetterHead,
    showQaulifications,
    showTimings,
  } = useSelector((state) => state.dashboard_Options_Slice);

  const [customerDashboard] = useState(true);

  if (showHighlights) {
    return (
      <Layout>
        <div className="w-full h-screen flex bg-gray-100">
          <Sidebar />
          <Highlights />
        </div>
      </Layout>
    );
  }

  if (showInfo) {
    return (
      <Layout>
        <div className="w-full h-screen flex bg-gray-100">
          <Sidebar />
          <DisplayInfo />
        </div>
      </Layout>
    );
  }

  if (showBookAppointment) {
    return (
      <Layout>
        <div className="w-full h-screen flex bg-gray-100">
          <Sidebar />
          {loginBooking ? (
            <LoginAppointmentForm />
          ) : (
            <AppointmentForm customerDashboard={customerDashboard} />
          )}
        </div>
      </Layout>
    );
  }

  if (showAppointmentDetails) {
    return (
      <Layout>
        <div className="w-full h-screen flex bg-gray-100">
          <Sidebar />
          <AppointmentDetails />
        </div>
      </Layout>
    );
  }

  if (showServices) {
    return (
      <Layout>
        <div className="w-full h-screen flex bg-gray-100">
          <Sidebar />
          <ServiceForm />
        </div>
      </Layout>
    );
  }

  if (showProfile) {
    return (
      <Layout>
        <div className="w-full h-screen flex bg-gray-100">
          <Sidebar />
          <Profile />
        </div>
      </Layout>
    );
  }

  if (showAbout) {
    return (
      <Layout>
        <div className="w-full h-screen flex bg-gray-100">
          <Sidebar />
          <AboutForm />
        </div>
      </Layout>
    );
  }

  if (showContact) {
    return (
      <Layout>
        <div className="w-full h-screen flex bg-gray-100">
          <Sidebar />
          <ContactForm />
        </div>
      </Layout>
    );
  }

  if (showLetterHead) {
    return (
      <Layout>
        <div className="w-full h-screen flex bg-gray-100">
          <Sidebar />
          <LetterHead />
        </div>
      </Layout>
    );
  }

  if (showQaulifications) {
    return (
      <Layout>
        <div className="w-full h-screen flex bg-gray-100">
          <Sidebar />
          <Qualifications />
        </div>
      </Layout>
    );
  }

  if (showTimings) {
    return (
      <Layout>
        <div className="w-full h-screen flex bg-gray-100">
          <Sidebar />
          <Timings />
        </div>
      </Layout>
    );
  }
};

export default Dashboard;
