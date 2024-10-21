import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Timings = () => {
  const [timings, setTimings] = useState({
    days: {
      monday: {
        morningFrom: "",
        morningTo: "",
        eveningFrom: "",
        eveningTo: "",
      },
      tuesday: {
        morningFrom: "",
        morningTo: "",
        eveningFrom: "",
        eveningTo: "",
      },
      wednesday: {
        morningFrom: "",
        morningTo: "",
        eveningFrom: "",
        eveningTo: "",
      },
      thursday: {
        morningFrom: "",
        morningTo: "",
        eveningFrom: "",
        eveningTo: "",
      },
      friday: {
        morningFrom: "",
        morningTo: "",
        eveningFrom: "",
        eveningTo: "",
      },
      saturday: {
        morningFrom: "",
        morningTo: "",
        eveningFrom: "",
        eveningTo: "",
      },
      sunday: {
        morningFrom: "",
        morningTo: "",
        eveningFrom: "",
        eveningTo: "",
      },
    },
  });

  const handleInputChange = (e, day, timeType) => {
    const { value } = e.target;

    setTimings((prevState) => ({
      ...prevState,
      days: {
        ...prevState.days,
        [day]: {
          ...prevState.days[day],
          [timeType]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", timings);
    await axios
      .put(`http://localhost:8000/api/v1/update-user-timings`, timings, {
        withCredentials: true,
      })
      .then(() => toast.success("Timings updated successfully"))
      .catch(() => toast.error("Timings updation failed"));
  };

  return (
    <div
      className="w-5/12 mx-auto p-4 bg-white shadow-lg rounded-lg overflow-y-auto mt-5"
      style={{ height: "600px" }}
    >
      <h2 className="text-3xl font-bold mb-4 text-pink-600 text-center">
        Timings
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(timings.days).map((day) => (
          <div key={day} className="odd:bg-gray-200 even:bg-white p-3">
            <h3 className="text-md font-semibold capitalize text-pink-600">
              {day}
            </h3>
            <div className="grid grid-cols-4 gap-1 items-center">
              <span className="text-xs font-semibold col-span-1">Morning:</span>
              <input
                type="time"
                name={`${day}MorningFrom`}
                value={timings.days[day].morningFrom}
                onChange={(e) => handleInputChange(e, day, `morningFrom`)}
                className="border border-gray-300 rounded-md p-1 text-sm"
                required
              />
              <span className="text-xs text-center">to</span>
              <input
                type="time"
                name={`${day}MorningTo`}
                value={timings.days[day].morningTo}
                onChange={(e) => handleInputChange(e, day, `morningTo`)}
                className="border border-gray-300 rounded-md p-1 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-4 gap-1 items-center mt-2">
              <span className="text-xs font-semibold col-span-1">Evening:</span>
              <input
                type="time"
                name={`${day}EveningFrom`}
                value={timings.days[day].eveningFrom}
                onChange={(e) => handleInputChange(e, day, `eveningFrom`)}
                className="border border-gray-300 rounded-md p-1 text-sm"
                required
              />
              <span className="text-xs text-center">to</span>
              <input
                type="time"
                name={`${day}EveningTo`}
                value={timings.days[day].eveningTo}
                onChange={(e) => handleInputChange(e, day, `eveningTo`)}
                className="border border-gray-300 rounded-md p-1 text-sm"
                required
              />
            </div>
          </div>
        ))}

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition duration-300 text-sm"
          >
            Update Timings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Timings;
