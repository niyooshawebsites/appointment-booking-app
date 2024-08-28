import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppointmentForm from "../components/AppointmentForm";

const Home = () => {
  return (
    <Layout>
      <Header />
      <AppointmentForm />
      <Footer />
    </Layout>
  );
};

export default Home;
