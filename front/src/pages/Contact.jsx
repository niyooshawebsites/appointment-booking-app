import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

const Contact = () => {
  const { businessName, email, contactNo, contact } = useSelector(
    (state) => state.service_Provider_Slice
  );

  // const path = window.location.pathname;
  // const username = path.split("/")[1] || "abs";

  // const [contactDetails, setContactDetails] = useState(() => {
  //   return {
  //     name: "",
  //     businessName: "",
  //     gst: "",
  //     contact: "",
  //     office: "",
  //     floor: "",
  //     building: "",
  //     street: "",
  //     locality: "",
  //     district: "",
  //     state: "",
  //     pinCode: "",
  //   }
  // });

  // const getContactDetails = async () => {
  //   await axios.get(`http://localhost:8000/api/v1/${username}`).then(res => setContactDetails(res.data.contact)).catch(err => console.log(err))
  // }

  // useEffect(() => {getContactDetails()}, []);

  const mapAddress = `${contact.building}, ${contact.locality}, ${contact.district}, ${contact.state}`;

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
    mapAddress
  )}`;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Business Name</h3>
            <p className="text-gray-600">{businessName}</p>
          </div>

          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-600">{email}</p>
          </div>

          <div>
            <h3 className="font-semibold">Contact Number</h3>
            <p className="text-gray-600">{contactNo}</p>
          </div>

          <div>
            <h3 className="font-semibold">Address</h3>
            <p className="text-gray-600">{contact.office}</p>
            <p className="text-gray-600">{contact.building}</p>
            <p className="text-gray-600">{contact.street}</p>
            <p className="text-gray-600">{contact.locality}</p>
            <p className="text-gray-600">{contact.district}</p>
            <p className="text-gray-600">{contact.state}</p>
            <p className="text-gray-600">{contact.pinCode}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Location Map</h3>
          <iframe
            title="Location Map"
            className="w-full h-64 border-0 rounded-lg"
            src={mapUrl}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
