import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Layout>
      <Header />
      <div className="container bg-orange-500">Appointment Booking System</div>
      <Footer />
    </Layout>
  );
};

export default Home;
