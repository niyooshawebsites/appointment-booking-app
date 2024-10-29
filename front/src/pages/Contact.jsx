import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import Unverified from "../components/Unverified";

const Contact = () => {
  const { businessName, email, contactNo, contact, isVerified } = useSelector(
    (state) => state.service_Provider_Slice
  );

  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.986330002446!2d77.2619868!3d28.540130599999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3de6aa6e483%3A0xc435a553bf3c0448!2sSaroj%20Tower%2C%20Guru%20Ravidas%20Marg%2C%20Block%20K%2C%20Kalkaji%2C%20New%20Delhi%2C%20Delhi%20110019!5e0!3m2!1sen!2sin!4v1729495744711!5m2!1sen!2sin";

  if (!isVerified) {
    return (
      <Layout>
        <Unverified />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-pink-600">
          Contact us
        </h1>

        <div className="flex">
          <div className="w-6/12">
            <div>
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
            </div>
          </div>
          <div className="w-6/12">
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-gray-600">{contact.office}</p>
              <p className="text-gray-600">{contact.building}</p>
              <p className="text-gray-600">
                {contact.street} {contact.locality}
              </p>
              <p className="text-gray-600">
                {contact.district} {contact.state} {contact.pinCode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
