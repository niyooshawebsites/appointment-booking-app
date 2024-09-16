import { useState } from "react";
import Appointments from "../components/Appointments";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import AboutForm from "../components/AboutForm";
import ContactForm from "../components/ContactForm";

const Dashboard = () => {
  const [showAppointments, setShowAppointments] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  if (showAppointments) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar
            setShowAppointments={setShowAppointments}
            setShowProfile={setShowProfile}
            setShowAbout={setShowAbout}
            showContact={setShowContact}
          />
          <Appointments />
        </div>
      </Layout>
    );
  }

  if (showProfile) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar
            setShowAppointments={setShowAppointments}
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
            setShowAppointments={setShowAppointments}
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
            setShowAppointments={setShowAppointments}
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
