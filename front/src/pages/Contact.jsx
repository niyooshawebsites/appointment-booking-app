import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

const Contact = () => {
  const path = window.location.pathname;
  const username = path.split("/")[1] || "abs";

  const [contactDetails, setContactDetails] = useState(() => {
    return {
      name: "",
      businessName: "",
      gst: "",
      contact: "",
      office: "",
      floor: "",
      building: "",
      street: "",
      locality: "",
      district: "",
      state: "",
      pinCode: "",
    }
  });

  const getContactDetails = async () => {
    await axios.get(`http://localhost:8000/api/v1/${username}`).then(res => setContactDetails(res.data.contact)).catch(err => console.log(err))
  }


  useEffect(() => {getContactDetails()}, []);

  const mapAddress = `${contactDetails.building}, ${contactDetails.locality}, ${contactDetails.district}, ${contactDetails.state}`;

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(mapAddress)}`;

  return (
    <Layout>
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Business Name</h3>
          <p className="text-gray-600">{contactDetails.businessName}</p>
        </div>

        <div>
          <h3 className="font-semibold">Contact person</h3>
          <p className="text-gray-600">{contactDetails.name}</p>
        </div>
        
        <div>
          <h3 className="font-semibold">Email</h3>
          <p className="text-gray-600">{contactDetails.email}</p>
        </div>

        <div>
          <h3 className="font-semibold">Contact Number</h3>
          <p className="text-gray-600">{contactDetails.contact}</p>
        </div>

        <div>
          <h3 className="font-semibold">Address</h3>
          <p className="text-gray-600">{contactDetails.office}</p>
          <p className="text-gray-600">{contactDetails.building}</p>
          <p className="text-gray-600">{contactDetails.street}</p>
          <p className="text-gray-600">{contactDetails.locality}</p>
          <p className="text-gray-600">{contactDetails.district}</p>
          <p className="text-gray-600">{contactDetails.state}</p>
          <p className="text-gray-600">{contactDetails.pinCode}</p>
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
