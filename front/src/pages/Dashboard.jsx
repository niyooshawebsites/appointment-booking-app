import { useState } from "react";
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

const Dashboard = () => {
  const [showHighlights, setShowHighlights] = useState(true);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAppointmentDetails, setshowAppointmentDetails] = useState(false);

  if (showHighlights) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar
            setShowHighlights={setShowHighlights}
            setShowAllUsers={setShowAllUsers}
            setShowAppointments={setShowAppointments}
            setshowAppointmentDetails={setshowAppointmentDetails}
            setShowServices={setShowServices}
            setShowProfile={setShowProfile}
            setShowAbout={setShowAbout}
            showContact={setShowContact}
          />
          <Highlights />
        </div>
      </Layout>
    );
  }

  if (showAllUsers) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar
            setShowHighlights={setShowHighlights}
            setShowAllUsers={setShowAllUsers}
            setShowAppointments={setShowAppointments}
            setshowAppointmentDetails={setshowAppointmentDetails}
            setShowServices={setShowServices}
            setShowProfile={setShowProfile}
            setShowAbout={setShowAbout}
            showContact={setShowContact}
          />
          <UsersInfo />
        </div>
      </Layout>
    );
  }

  if (showAppointments) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar
            setShowHighlights={setShowHighlights}
            setShowAllUsers={setShowAllUsers}
            setShowAppointments={setShowAppointments}
            setshowAppointmentDetails={setshowAppointmentDetails}
            setShowServices={setShowServices}
            setShowProfile={setShowProfile}
            setShowAbout={setShowAbout}
            showContact={setShowContact}
          />
          <Appointments />
        </div>
      </Layout>
    );
  }

  if (showAppointmentDetails) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar
            setShowHighlights={setShowHighlights}
            setShowAllUsers={setShowAllUsers}
            setShowAppointments={setShowAppointments}
            setshowAppointmentDetails={setshowAppointmentDetails}
            setShowServices={setShowServices}
            setShowProfile={setShowProfile}
            setShowAbout={setShowAbout}
            showContact={setShowContact}
          />
          <AppointmentDetails />
        </div>
      </Layout>
    );
  }

  if (showServices) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar
            setShowHighlights={setShowHighlights}
            setShowAllUsers={setShowAllUsers}
            setShowAppointments={setShowAppointments}
            setshowAppointmentDetails={setshowAppointmentDetails}
            setShowServices={setShowServices}
            setShowProfile={setShowProfile}
            setShowAbout={setShowAbout}
            showContact={setShowContact}
          />
          <ServiceForm />
        </div>
      </Layout>
    );
  }

  if (showProfile) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar
            setShowHighlights={setShowHighlights}
            setShowAllUsers={setShowAllUsers}
            setShowAppointments={setShowAppointments}
            setshowAppointmentDetails={setshowAppointmentDetails}
            setShowServices={setShowServices}
            setShowProfile={setShowProfile}
            setShowAbout={setShowAbout}
            showContact={setShowContact}
          />
          <Profile />
        </div>
      </Layout>
    );
  }

  if (showAbout) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar
            setShowHighlights={setShowHighlights}
            setShowAllUsers={setShowAllUsers}
            setShowAppointments={setShowAppointments}
            setshowAppointmentDetails={setshowAppointmentDetails}
            setShowServices={setShowServices}
            setShowProfile={setShowProfile}
            setShowAbout={setShowAbout}
            showContact={setShowContact}
          />
          <AboutForm />
        </div>
      </Layout>
    );
  }

  if (showContact) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar
            setShowHighlights={setShowHighlights}
            setShowAllUsers={setShowAllUsers}
            setShowAppointments={setShowAppointments}
            setshowAppointmentDetails={setshowAppointmentDetails}
            setShowServices={setShowServices}
            setShowProfile={setShowProfile}
            setShowAbout={setShowAbout}
            showContact={setShowContact}
          />
          <ContactForm />
        </div>
      </Layout>
    );
  }
};

export default Dashboard;
