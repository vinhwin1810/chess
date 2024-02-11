import { Link } from "react-router-dom";
import { FaChessPawn } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false); // New state for showing the toast

  const Toast = ({ message, onClose }) => {
    return (
      <div className="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded shadow-lg flex items-center justify-between">
        {message}
        <button onClick={onClose} className="text-white ml-4 text-xl">
          &times;
        </button>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValues.password !== inputValues.retypePassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputValues.email,
          username: inputValues.username,
          password: inputValues.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "User Created Successfully") {
          setError("");
          setShowToast(true); // Show the toast notification

          setTimeout(() => {
            navigate("/login"); // Redirect to the login page after 3 seconds
            setShowToast(false);
          }, 2000); // Hide the toast after 3 seconds
        }
      } else {
        throw new Error("Registration failed. Please try again later.");
      }
    } catch (error) {
      setError("Oops. Something is wrong, please try again later.");
    }
  };
  return (
    <section className="bg-gray-700">
      <div className="flex flex-col justify-center items-center h-screen">
        <Link
          to="/home"
          className="flex flex-row gap-3 text-green-500 hover:text-white 
          font-bold text-4xl py-10 px-4 transition-all duration-300 ease-linear
          cursor-pointer"
        >
          <FaChessPawn size="100" />
        </Link>

        <div className="w-full rounded-lg shadow-lg border-2 md:mt-0 sm:max-w-md xl:p-0 bg-gray-900">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Let's set up your account
            </h1>

            {error && (
              <p className="text-red-500" aria-live="assertive">
                {error}
              </p> // Enhanced UI Feedback and Accessibility
            )}
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={inputValues.email}
                  onChange={handleOnChange}
                  className="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Username
                </label>
                <input
                  type="name"
                  name="username"
                  id="name"
                  value={inputValues.username}
                  onChange={handleOnChange}
                  placeholder="Your Name"
                  className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={inputValues.password}
                  onChange={handleOnChange}
                  placeholder="••••••••"
                  className=" border sm:text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Retype your password
                </label>
                <input
                  type="password"
                  name="retypePassword"
                  value={inputValues.retypePassword}
                  onChange={handleOnChange}
                  placeholder="••••••••"
                  className=" border sm:text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  required
                />
              </div>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="w-full text-white bg-green-500 hover:bg-green-400 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5 text-center"
              >
                Sign up
              </button>

              {showToast && (
                <Toast
                  message="You Are Registered Successfully"
                  onClose={() => setShowToast(false)}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
