import { useState } from "react";
import Highlights from "../components/Highlights";
import Appointments from "../components/Appointments";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";

const Dashboard = () => {
  const [showHighlights, setShowHighlights] = useState(true);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  if (showHighlights) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar
            setShowHighlights={setShowHighlights}
            setShowAppointments={setShowAppointments}
            setShowProfile={setShowProfile}
          />
          <Highlights />
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
            setShowAppointments={setShowAppointments}
            setShowProfile={setShowProfile}
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
            setShowHighlights={setShowHighlights}
            setShowAppointments={setShowAppointments}
            setShowProfile={setShowProfile}
          />
          <Profile />
        </div>
      </Layout>
    );
  }
};

export default Dashboard;
