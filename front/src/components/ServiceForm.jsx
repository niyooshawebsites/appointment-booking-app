import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const ServiceForm = () => {
  const { username } = useSelector((state) => state.user_Slice);
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

    try {
      const res = await axios.patch(
        "http://localhost:8000/api/v1/update-service",
        currentService,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }

    setCurrentService(() => {
      return {
        serviceId: "",
        serviceName: "",
        fee: "",
      };
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/delete-service/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setServiceDeleted((prevState) => !prevState);
        toast.success(res.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const fetchAllServices = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-services/${username}`
      );

      if (res.data.success) {
        setAllServices(res.data.services);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, [currentService, serivceDeleted]);

  return (
    <div className="w-10/12 md:w-6/12  mx-auto p-2">
      <h2 className="mt-10 mb-4 text-center text-3xl text-pink-600">
        Services
      </h2>
      {/* Form Section */}
      <form
        className="bg-white shadow-md rounded-lg p-6 mb-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            name="serviceName"
            value={currentService.serviceName}
            onChange={handleChange}
            placeholder="Service Name"
            className="w-full mb-3 md:mb-0 px-4 py-2 border rounded-md focus:outline-none ring-2 ring-indigo-700"
            required
          />
          <input
            type="number"
            name="fee"
            value={currentService.fee}
            onChange={handleChange}
            placeholder="Fee"
            className="w-full mb-3 md:mb-0 px-4 py-2 border rounded-md focus:outline-none ring-2 ring-indigo-700"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors"
          >
            Add Service
          </button>
        </div>
      </form>

      {allServices.length > 0 ? (
        <table className="w-10/12 md:w-8/12 mx-auto bg-white shadow-md rounded-lg mt-10 text-sm">
          <thead className="bg-pink-600 text-white">
            <tr className=" text-left text-sm font-semibold">
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Service</th>
              <th className="py-2 px-3">Fee</th>
              <th className="py-2 px-3 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {allServices.map((service, index) => (
              <tr
                key={service.serviceId}
                className="border-b odd:bg-gray-200 even:bg-white"
              >
                <td className="px-3 py-2">{index + 1}</td>
                <td className="px-3 py-2">{service.serviceName}</td>
                <td className="px-3 py-2">Rs {service.fee}</td>
                <td className="px-3 py-2">
                  <div className="flex justify-center items-center">
                    <Link
                      className="text-red-600 text-xl rounded-md hover:text-red-800 transition-colors"
                      onClick={() => handleDelete(service.serviceId)}
                    >
                      <RxCross2 />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-400 mt-5">No services found</p>
      )}
    </div>
  );
};

export default ServiceForm;
