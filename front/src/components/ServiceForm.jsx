import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ServiceForm = () => {
  const { username } = useSelector((state) => state.user_Slice);

  const [services, setServices] = useState(() => [
    {
      serviceId: "",
      service: "",
      fee: "",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServices((prevState) => [
      {
        [name]: value.trim(),
      },
      ...prevState,
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .patch("http://localhost:8000/api/v1/update-service", services[0], {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        toast("Service created successfully");
      })
      .catch((err) => {
        console.log(err);
        toast("Service creation failed");
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://locahost:8000/api/v1/delete-service/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        toast("Service deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast("Service deletetion failed");
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Form Section */}
      <form
        className="bg-white shadow-md rounded-lg p-6 mb-6"
        onSubmit={handleSubmit}
      >
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            name="service"
            value={services[0].service}
            onChange={handleChange}
            placeholder="Service Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="fee"
            value={services[0].fee}
            onChange={handleChange}
            placeholder="Fee"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        ></button>
      </form>

      {/* Table Section */}
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left text-sm uppercase font-semibold">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Service</th>
            <th className="py-3 px-4">Charges</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service, index) => (
            <tr key={service.serviceId} className="border-b">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{service.name}</td>
              <td className="py-3 px-4">${service.fee}</td>
              <td className="py-3 px-4 space-x-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                  onClick={() => handleDelete(service.serviceId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceForm;
