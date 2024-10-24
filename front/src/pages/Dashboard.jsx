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
import Announcement from "../components/Announcement";
import Walkin from "../components/Walkin";

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
    showInvoice,
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
          <Announcement />
          <Walkin />
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
          <Announcement />
          <Walkin />
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
          <Announcement />
          <Walkin />
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
          <Announcement />
          <Walkin />
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
          <Announcement />
          <Walkin />
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
          <Announcement />
          <Walkin />
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
          <Announcement />
          <Walkin />
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
          <Announcement />
          <Walkin />
        </div>
      </Layout>
    );
  }

  if (showInvoice) {
    return (
      <Layout>
        <div className="w-full h-screen flex bg-gray-100">
          <Sidebar />
          <LetterHead />
          <Announcement />
          <Walkin />
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
          <Announcement />
          <Walkin />
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
          <Announcement />
          <Walkin />
        </div>
      </Layout>
    );
  }
};

export default Dashboard;
