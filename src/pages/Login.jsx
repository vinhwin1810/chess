import { Link } from "react-router-dom";
import { FaChessKing } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
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
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputValues.email,
          password: inputValues.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "Login Successful") {
          setError("");
          setShowToast(true); // Show the toast notification

          setTimeout(() => {
            navigate("/");
            setShowToast(false);
          }, 2000);
        }
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again");
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
          <FaChessKing size="35" /> Chess.com
        </Link>

        <div className="w-full rounded-lg shadow-lg border-2 md:mt-0 sm:max-w-md xl:p-0 bg-gray-900">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign in to your account
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
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleOnChange}
                  className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
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
                  onChange={handleOnChange}
                  placeholder="••••••••"
                  className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 borderrounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className=" text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#" // Add the link to the forgot password page
                  className="text-sm font-medium hover:underline text-white"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="w-full text-white bg-green-500 hover:bg-green-400 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
            {showToast && (
              <Toast
                message="You Are Registered Successfully"
                onClose={() => setShowToast(false)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
