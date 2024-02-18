import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomDialog = ({ over, onClose }) => {
  // Removed the internal state management since it will be controlled by the parent now
  return (
    <div>
      {over && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-10 rounded shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Game Over</h2>
            <button
              onClick={onClose} // Call the passed function on click
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
export default CustomDialog;
