import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const About = () => {
  const [about, setAbout] = useState("");

  useEffect(() => {
    const getAboutData = async () => {
      await axios
        .get("http://localhost:8000/api/v1/about")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };

    getAboutData();
  }, []);
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          We are a dedicated team of professionals committed to delivering the
          best service to our clients. Our mission is to innovate and lead in
          our industry while ensuring customer satisfaction and trust.
        </p>
        <div className="flex justify-center items-center">
          <Link
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            to="/"
          >
            Book Your Appointment Now
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default About;
