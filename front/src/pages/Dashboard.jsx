import { useState } from "react";
import Appointments from "../components/Appointments";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";

const Dashboard = () => {
  const [showAppointments, setShowAppointments] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  if (showAppointments) {
    return (
      <Layout>
        <div className="w-full h-screen flex">
          <Sidebar
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
