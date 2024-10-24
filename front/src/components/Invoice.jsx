import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
import { toast } from "react-toastify";

const Invoice = () => {
  const contentRef = useRef();
  const dispatch = useDispatch();
  const [serviceProviderDetails, setServiceProviderDetails] = useState(() => {
    return {
      businessName: "",
      contactNo: "",
      email: "",
      website: "",
      qualifications: "",
      timings: "",
      office: "",
      floor: "",
      building: "",
      street: "",
      locality: "",
      district: "",
      state: "",
      pinCode: "",
    };
  });

  const reactToPrintFn = useReactToPrint({ contentRef });

  const {
    service,
    date,
    time,
    firstName,
    lastName,
    email,
    contactNo,
    age,
    gender,
    address,
    city,
    state,
    pinCode,
    paymentMethod,
  } = useSelector((state) => state.appointment_Slice);

  const { username } = useSelector((state) => state.user_Slice);

  // get a particular service provider for printing by username
  const getAParticularUserForPrinting = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-a-particular-user-for-printing-by-username/${username}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setServiceProviderDetails((prevDetails) => {
          return {
            ...prevDetails,
            businessName: res.data.user.businessName,
            contactNo: res.data.user.contactNo,
            email: res.data.user.email,
            website: res.data.user.website,
            timings: res.data.user.timings,
            qualifications: res.data.user.qualifications,
            office: res.data.user.office,
            floor: res.data.user.floor,
            building: res.data.user.building,
            street: res.data.user.street,
            locality: res.data.user.locality,
            district: res.data.user.district,
            state: res.data.user.state,
            pinCode: res.data.user.pinCode,
          };
        });
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // go back function
  const goback = () => {
    dispatch(
      dashboardOptionsSliceActions.toggleDashboardOptions({
        showHighlights: false,
        showInfo: true,
        showServices: false,
        showProfile: false,
        showAbout: false,
        showContact: false,
        showAppointmentDetails: false,
        showBookAppointment: false,
        showLetterHead: false,
        showInvoice: false,
        showQaulifications: false,
        showTimings: false,
      })
    );
  };

  useEffect(() => {
    getAParticularUserForPrinting();
  }, []);

  const myStyle = {
    "@mediaPrint": {
      "@page": {
        size: "A4",
      },
    },
    width: "100%",
    height: "297mm",
  };

  return (
    <div
      className="m-1"
      style={{ transform: "scale(0.5)", margin: "-300px 0" }}
    >
      {/* header */}
      <div className="flex justify-between">
        <button
          onClick={goback}
          className=" text-3xl bg-pink-600 px-4 py-2 rounded text-white m-2 hover:bg-pink-700"
        >
          Back
        </button>
        <button
          onClick={reactToPrintFn}
          className=" text-3xl bg-pink-600 px-4 py-2 rounded text-white m-2 hover:bg-pink-700"
        >
          Print
        </button>
      </div>

      {/* body */}
      <div
        className="flex flex-col justify-between border border-slate-500 p-5"
        ref={contentRef}
        style={myStyle}
      >
        <div className="flex flex-col justify-start mb-3">
          {/* header */}
          <header className="flex justify-between mb-3">
            <div>
              <h1 className="text-3xl text-pink-600">Dr. {username}</h1>
              <p>{serviceProviderDetails.qualifications}</p>
            </div>
            <div>
              <h2 className="text-2xl text-pink-600">
                {serviceProviderDetails.businessName}
              </h2>
            </div>
          </header>

          <hr className="mb-3" />

          {/* Invoice number */}
          <section>
            <h1 className="mt-3 text-center text-2xl underline">INVOICE</h1>
            <p className="mt-3 text-center">
              Date: {date} | Time: {time} | Invoice number: 7487852 | Payment
              Mode: Online
            </p>
            <p className="mt-3 text-center">
              Patient ID: 7845215232 | Appointment ID: 87545455
            </p>
          </section>

          {/* Patient Details */}
          <section>
            <h1 className="mt-3 text-center text-2xl underline">
              Patient Details
            </h1>
            <table className="mt-5 w-full">
              <thead>
                <tr className="border border-slate-400">
                  <th className="border border-slate-400 py-2">Name</th>
                  <th className="border border-slate-400 py-2">Age</th>
                  <th className="border border-slate-400 py-2">Gender</th>
                  <th className="border border-slate-400 py-2">
                    Contact number
                  </th>
                  <th className="border border-slate-400 py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td className="border border-slate-400 py-2 text-center">
                    {`${firstName} ${lastName}`}
                  </td>
                  <td className="border border-slate-400 py-2 text-center">
                    {age}
                  </td>
                  <td className="border border-slate-400 py-2 text-center">
                    {gender}
                  </td>
                  <td className="border border-slate-400 py-2 text-center">
                    {contactNo}
                  </td>
                  <td className="border border-slate-400 py-2 text-center">
                    {email}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="border border-t-0 border-slate-400 px-2 py-2 text-center">
              <span>
                <span className="font-bold">Patient Address: </span>
                {`${address}, ${city}, ${state} ${pinCode}`}
              </span>
            </div>
            <div className="border border-t-0 border-slate-400 px-2 py-2 text-center">
              <span>
                <span className="font-bold">Service: </span>
                {service}
              </span>
              &nbsp;
              <span>
                <span className="font-bold">Payment: </span>
                {paymentMethod}
              </span>
            </div>
          </section>

          {/* Service Details */}
          <section>
            <h1 className="mt-3 text-center text-2xl underline">Bill</h1>
            <table className="mt-5 w-full">
              <thead>
                <tr className="border border-slate-400">
                  <th className="border border-slate-400 py-2">Particulars</th>
                  <th className="border border-slate-400 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td className="border border-slate-400 py-2 text-center">
                    {service}
                  </td>
                  <td className="border border-slate-400 py-2 text-center">
                    500
                  </td>
                </tr>
                <tr className="border">
                  <td className="border border-slate-400 py-2 text-center">
                    CGST - 9%
                  </td>
                  <td className="border border-slate-400 py-2 text-center">
                    45
                  </td>
                </tr>
                <tr className="border">
                  <td className="border border-slate-400 py-2 text-center">
                    SGST - 9%
                  </td>
                  <td className="border border-slate-400 py-2 text-center">
                    45
                  </td>
                </tr>
                <tr className="border">
                  <td className="border border-slate-400 py-2 text-center">
                    Total
                  </td>
                  <td className="border border-slate-400 py-2 text-center">
                    590
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        {/* footer */}
        <footer className="flex flex-col">
          <hr />
          <div className="py-2 text-center">
            <span className="font-bold">Address</span>:{" "}
            {`${serviceProviderDetails.office}, ${serviceProviderDetails.floor}, ${serviceProviderDetails.building}, ${serviceProviderDetails.street}, ${serviceProviderDetails.locality}, ${serviceProviderDetails.locality}, ${serviceProviderDetails.district}, ${serviceProviderDetails.state} ${serviceProviderDetails.pinCode}`}
          </div>
          <div className="flex justify-center py-2">
            <div className="mx-2">
              <span className="font-bold">Website</span>:
              {`http://localhost:5173/${username}`}
            </div>
            <div className="mx-2">
              <span className="font-bold">Timings</span>:{" "}
              {serviceProviderDetails.timings}
            </div>
          </div>
          <div className="flex justify-center py-2">
            <div className="mx-2">
              <span className="font-bold">Contact No</span>:{" "}
              {serviceProviderDetails.contactNo}
            </div>
            <div className="mx-2">
              <span className="font-bold">Email</span>:{" "}
              {serviceProviderDetails.email}
            </div>
          </div>
          <div className="py-2 text-center font-bold">
            Kindly book your appointments online.
          </div>
        </footer>
      </div>
    </div>
  );
};

// Assign a display name to avoid the warning
Invoice.displayName = "Invoice";

export default Invoice;
