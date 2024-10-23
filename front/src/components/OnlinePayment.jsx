import QR from "../images/dummyQR.png";
import { onlinePaymentSliceActions } from "../store/slices/OnlinePyamentSlice";
import { useDispatch, useSelector } from "react-redux";

const OnlinePayment = () => {
  const { payOnline } = useSelector((state) => state.online_Payment_Slice);
  const dispatch = useDispatch();

  if (payOnline) {
    return (
      <div
        id="modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg w-3/12 p-6">
          <div className="max-w-4xl mx-auto my-4 h-[300px] p-6  rounded-lg bg-white">
            <div className="space-y-2 h-full flex flex-col justify-center items-center p-2">
              <p className="text-gray-400 text-center">
                Post payment close the pop, enter the transaction ID and
                complete the booking
              </p>
              <div>
                <img src={QR} alt="QR image" style={{ width: "200px" }} />
              </div>
              <div className="flex gap-x-4">
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                  onClick={() => {
                    dispatch(
                      onlinePaymentSliceActions.changeOnlinePaymentStatus({
                        payOnline: false,
                      })
                    );
                  }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => {
                    dispatch(
                      onlinePaymentSliceActions.changeOnlinePaymentStatus({
                        payOnline: false,
                      })
                    );
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
};

export default OnlinePayment;
