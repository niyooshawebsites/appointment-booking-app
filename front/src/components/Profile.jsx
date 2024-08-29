const Profile = () => {
  return (
    <div className="mx-auto">
      <form action="" className="w-full bg-gray-100 p-3 mt-12 rounded-md ">
        <div className="mt-2">
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="on"
            placeholder="username"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="on"
            placeholder="Email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="on"
            placeholder="Password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-2">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
