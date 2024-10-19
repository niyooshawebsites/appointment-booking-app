import { useSelector } from "react-redux";
const Ticker = () => {
  const { announcement } = useSelector((state) => state.service_Provider_Slice);
  return (
    <div className="w-full bg-gray-100 flex justify-center items-center">
      <div className="overflow-hidden whitespace-nowrap w-full bg-white shadow-md border rounded-md">
        <div className="ticker-text flex">
          {/* Duplicate ticker content to create a continuous effect */}
          <div className="ticker-content">
            <span className="text-lg font-semibold text-pink-600 mx-8">
              Attention: {announcement}
            </span>
          </div>
          <div className="ticker-content">
            <span className="text-lg font-semibold text-pink-600 mx-8">
              Attention: {announcement}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
