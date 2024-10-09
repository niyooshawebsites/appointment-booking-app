import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ServiceForm = () => {
  const { username } = useSelector((state) => state.user_Slice);
  console.log(username);
  const [serivceDeleted, setServiceDeleted] = useState(false);
  const [currentService, setCurrentService] = useState(() => {
    return {
      serviceId: "",
      serviceName: "",
      fee: "",
    };
  });

  const [allServices, setAllServices] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentService((prevState) => {
      return {
        ...prevState,
        serviceId: uuidv4(),
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .patch("http://localhost:8000/api/v1/update-service", currentService, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        toast.success("Service created successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Service creation failed");
      });

    setCurrentService(() => {
      return {
        serviceId: "",
        serviceName: "",
        fee: "",
      };
    });
  };

  const handleDelete = async (id) => {
    await axios
      .patch(
        `http://localhost:8000/api/v1/delete-service/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setServiceDeleted((prevState) => !prevState);
        toast.success("Service deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Service deletetion failed");
      });
  };

  const fetchAllServices = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/get-services/${username}`)
      .then((res) => setAllServices(res.data.services))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllServices();
  }, [currentService, serivceDeleted]);

  return (
    <div className="w-8/12  mx-auto p-4">
      <h2 className="mt-10 mb-4 text-center text-2xl">Service Details</h2>
      {/* Form Section */}
      <form
        className="bg-white shadow-md rounded-lg p-6 mb-6"
        onSubmit={handleSubmit}
      >
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            name="serviceName"
            value={currentService.serviceName}
            onChange={handleChange}
            placeholder="Service Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="fee"
            value={currentService.fee}
            onChange={handleChange}
            placeholder="Fee"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Add Service
          </button>
        </div>
      </form>

      {/* Table Section */}
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left text-sm uppercase font-semibold">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Service</th>
            <th className="py-3 px-4">Fee</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {allServices.map((service, index) => (
            <tr key={service.serviceId} className="border-b">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{service.serviceName}</td>
              <td className="py-3 px-4">${service.fee}</td>
              <td className="py-3 px-4 space-x-2">
                <Link
                  className="text-red-500 px-3 py-1 rounded-md hover:text-red-600 transition-colors"
                  onClick={() => handleDelete(service.serviceId)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceForm;
