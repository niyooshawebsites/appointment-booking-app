const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader">
        <div className="animate-spin rounded-full border-4 border-t-4 border-t-blue-500 border-gray-300 h-16 w-16"></div>
      </div>
    </div>
  );
};

export default Loader;
