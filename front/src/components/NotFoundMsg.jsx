import { Link } from "react-router-dom";

const NotFoundMsg = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">404</h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        The content doest exist!
      </p>
      <div className="flex justify-center items-center">
        <Link
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          to={`/`}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundMsg;
