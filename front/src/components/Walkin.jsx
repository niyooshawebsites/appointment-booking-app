import { useSelector, useDispatch } from "react-redux";
import { walkinSliceActions } from "../store/slices/WalkinSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Walkin = () => {
  const { showWalkinModal } = useSelector((state) => state.walkin_Slice);
  const [services, setServices] = useState([]);
  const { username } = useSelector((state) => state.user_Slice);
  const dispatch = useDispatch();
  const [searchUser, setSearchUser] = useState("");
  const [custDetails, setCustDetails] = useState(() => {
    return {
      service: "",
      fee: "",
      date: "",
      time: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      age: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleSearchChange = (e) => {
    setSearchUser(e.target.value);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();

    // check for exsisting client and register the same
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/check-wallkin-client-availability/${searchUser}`,
        { withCredentials: true }
      );

      if (!res.data.success) {
        const res = await axios.post("http://localhost:8000/api/v1/register", {
          role: "0",
          specialization: "N/A",
          username: custDetails.email,
          email: custDetails.email,
          password: "12345",
        });

        if (res.data.success) {
          toast.success(res.data.msg);
        }
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }

    // updating the walkin client
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-walkin-client-details/${custDetails.email}`,
        {
          firstName: custDetails.firstName,
          lastName: custDetails.lastName,
          contactNo: custDetails.contactNo,
          age: custDetails.age,
          gender: custDetails.gender,
          address: custDetails.address,
          city: custDetails.city,
          state: custDetails.state,
          pinCode: custDetails.pinCode,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }

    // api for booking walkin appointment
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/book-appointment-for-walkin-client/${username}`,
        {
          ...custDetails,
          fee: custDetails.service.split("-")[1].slice(4),
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }

      if (!res.data.success) {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }

    setCustDetails((prevDetails) => {
      return {
        ...prevDetails,
        service: "",
        date: "",
        fee: "",
        time: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNo: "",
        age: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
      };
    });
  };

  const handleSearchAndPopulate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/check-wallkin-client-availability/${searchUser}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/v1/get-particular-client-data-by-contactNo/${searchUser}`,
            { withCredentials: true }
          );

          if (res.data.success) {
            setCustDetails((prevDetails) => {
              return {
                ...prevDetails,
                firstName: res.data.user.firstName || "",
                lastName: res.data.user.lastName || "",
                email: res.data.user.email || "",
                contactNo: res.data.user.contactNo || "",
                age: res.data.user.age || "",
                gender: res.data.user.gender || "",
                address: res.data.user.address || "",
                city: res.data.user.city || "",
                state: res.data.user.state || "",
                pinCode: res.data.user.pinCode || "",
              };
            });
          }
        } catch (err) {
          toast.error(err.response.data.msg);
        }
      }

      if (!res.data.success) {
        toast.error(res.data.msg);
        setCustDetails((prevDetails) => {
          return {
            ...prevDetails,
            service: "",
            fee: "",
            date: "",
            time: "",
            firstName: "",
            lastName: "",
            email: "",
            contactNo: "",
            age: "",
            gender: "",
            address: "",
            city: "",
            state: "",
            pinCode: "",
          };
        });
      }
    } catch (err) {
      toast.error(err.response.data.msg);

      setCustDetails((prevDetails) => {
        return {
          ...prevDetails,
          service: "",
          fee: "",
          date: "",
          time: "",
          firstName: "",
          lastName: "",
          email: "",
          contactNo: "",
          age: "",
          gender: "",
          address: "",
          city: "",
          state: "",
          pinCode: "",
        };
      });
    }
  };

  // get all services by a particular username
  const getAllServicesByUsername = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-services/${username}`
      );

      if (res.data.success) {
        setServices(res.data.services);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    getAllServicesByUsername();
  }, []);

  const currentDate = new Date().toISOString().split("T")[0];

  if (showWalkinModal) {
    return (
      <>
        <div
          id="modal"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          style={{ zIndex: 400 }}
        >
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-6/12 p-6 border">
            <form onSubmit={handleSearchAndPopulate}>
              <div className="flex justify-center items-center">
                <div className="w-8/12 mr-2">
                  <input
                    type="text"
                    autoComplete="on"
                    value={searchUser}
                    onChange={handleSearchChange}
                    required
                    placeholder="Search a patient using contact number..."
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
                <div className="w-3/12">
                  <button
                    type="submit"
                    className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Search and Auto Fill
                  </button>
                </div>
              </div>
            </form>

            <form
              className="max-w-4xl mx-auto my-4 h-auto p-6 border rounded-lg shadow-md bg-white"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2 flex flex-col justify-center">
                {/* Appointment Details */}
                <div className="pb-4">
                  <h2 className="text-lg font-semibold mb-2 text-pink-600">
                    Appointment Details
                  </h2>
                  <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
                    <div>
                      <select
                        name="service"
                        id="service"
                        value={custDetails.service}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 rounded-md shadow-sm ring-2 ring-indigo-700"
                      >
                        <option value="">Select service</option>
                        {services.map((service) => (
                          <option
                            value={`${service.serviceName} - Rs ${service.fee}`}
                            key={service.serviceId}
                          >
                            {`${service.serviceName} - Rs ${service.fee}`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        min={currentDate}
                        autoComplete="on"
                        value={custDetails.date}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 rounded-md shadow-sm ring-2 ring-indigo-700"
                      />
                    </div>

                    <div className="flex justify-center items-center">
                      <label htmlFor="time" className="block mb-1 mr-2">
                        Time
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={custDetails.time}
                        onChange={handleChange}
                        className="w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 "
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="border-b border-t pb-4">
                  <h2 className="text-lg font-semibold mb-2 text-pink-600">
                    Personal Details
                  </h2>
                  <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
                    <div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="on"
                        value={custDetails.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        required
                        className="block w-full p-2 rounded-md shadow-sm ring-2 ring-indigo-700"
                      />
                    </div>

                    <div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="on"
                        value={custDetails.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        required
                        className="block w-full p-2 rounded-md shadow-sm ring-2 ring-indigo-700"
                      />
                    </div>

                    <div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="on"
                        value={custDetails.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="block w-full p-2 rounded-md shadow-sm ring-2 ring-indigo-700"
                      />
                    </div>

                    <div>
                      <input
                        id="contactNo"
                        name="contactNo"
                        type="number"
                        minLength={10}
                        maxLength={10}
                        autoComplete="on"
                        value={custDetails.contactNo}
                        onChange={handleChange}
                        placeholder="Contact number"
                        required
                        className="block w-full p-2 rounded-md shadow-sm ring-2 ring-indigo-700"
                      />
                    </div>

                    <div>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        min={1}
                        autoComplete="on"
                        value={custDetails.age}
                        onChange={handleChange}
                        placeholder="Age"
                        required
                        className="block w-full p-2 rounded-md shadow-sm ring-2 ring-indigo-700"
                      />
                    </div>

                    <div>
                      <select
                        name="gender"
                        id="gender"
                        value={custDetails.gender}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 rounded-md shadow-sm ring-2 ring-indigo-700"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div className="col-span-full">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="on"
                        value={custDetails.address}
                        onChange={handleChange}
                        placeholder="Address"
                        required
                        className="block w-full p-2 rounded-md shadow-sm ring-2 ring-indigo-700"
                      />
                    </div>

                    <div>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="on"
                        value={custDetails.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                        className="block w-full p-2 rounded-md shadow-sm ring-2 ring-indigo-700"
                      />
                    </div>

                    <div>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        autoComplete="on"
                        value={custDetails.state}
                        onChange={handleChange}
                        placeholder="State"
                        required
                        className="block w-full p-2 rounded-md shadow-sm ring-2 ring-indigo-700"
                      />
                    </div>

                    <div>
                      <input
                        id="pinCode"
                        name="pinCode"
                        type="number"
                        minLength={6}
                        maxLength={6}
                        autoComplete="on"
                        value={custDetails.pinCode}
                        onChange={handleChange}
                        placeholder="Pin code"
                        required
                        className="block w-full p-2 rounded-md shadow-sm ring-2 ring-indigo-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-x-4">
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                    onClick={() => {
                      setCustDetails((prevDetails) => {
                        return {
                          ...prevDetails,
                          service: "",
                          date: "",
                          time: "",
                          firstName: "",
                          lastName: "",
                          email: "",
                          username: "",
                          password: "12345",
                          contactNo: "",
                          age: "",
                          gender: "",
                          address: "",
                          city: "",
                          state: "",
                          pinCode: "",
                          serviceProvider: username,
                        };
                      });

                      setSearchUser("");

                      dispatch(
                        walkinSliceActions.changeWalkinStatus({
                          showWalkinModal: false,
                        })
                      );
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return "";
  }
};

export default Walkin;
