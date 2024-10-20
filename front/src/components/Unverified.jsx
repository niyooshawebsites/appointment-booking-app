const Unverified = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl text-center text-red-500">
        Doctor account is not verified!
      </h1>
      <h2 className="text-xl text-gray-500 mt-3">
        Please verify your email to access the service
      </h2>
    </div>
  );
};

export default Unverified;
