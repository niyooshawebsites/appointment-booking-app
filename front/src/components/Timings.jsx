import { useState } from "react";
import axios from "axios";

const Timings = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const onSubmitHandler = async () => {};

  return (
    <div className="w-8/12  mx-auto p-2">
      <h2 className="mt-10 mb-4 text-center text-3xl text-pink-600">Timings</h2>
      <form
        className="w-6/12 mx-auto p-3 mt-1 rounded-md"
        onSubmit={onSubmitHandler}
      >
        <div className="mt-4">
          <label htmlFor="startTime"> From</label>
          <input
            type="time"
            name="from"
            min="09:00"
            max="18:00"
            placeholder="HH:MM"
            className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 mt-2"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="startTime"> To</label>
          <input
            type="time"
            name="to"
            min="09:00"
            max="18:00"
            placeholder="HH:MM"
            className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 mt-2"
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
    </div>
  );
};

export default Timings;
