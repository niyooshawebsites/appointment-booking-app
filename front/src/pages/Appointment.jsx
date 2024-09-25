import Layout from "../components/Layout";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = ({ serviceProvider }) => {
  return (
    <Layout>
      <AppointmentForm serviceProvider={serviceProvider} />
    </Layout>
  );
};

export default Appointment;
