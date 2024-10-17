import { useState } from "react";
import axios from "axios";

const Timings = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const onSubmitHandler = async () => {};

  return (
    <form
      className="w-6/12 mx-auto p-3 mt-1 rounded-md"
      onSubmit={onSubmitHandler}
    >
      <div className="mt-4">
        <label htmlFor="startTime"> Start Time</label>
        <input
          type="time"
          name="startTime"
          min="09:00"
          max="18:00"
          placeholder="HH:MM"
          className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 ml-2"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="startTime"> End Time</label>
        <input
          type="time"
          name="endTime"
          min="09:00"
          max="18:00"
          placeholder="HH:MM"
          className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 ml-2"
          required
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update Timings
        </button>
      </div>
    </form>
  );
};

export default Timings;
