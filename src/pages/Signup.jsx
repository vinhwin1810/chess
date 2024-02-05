import { Link } from "react-router-dom";
import { FaChessPawn } from "react-icons/fa6";

const Signup = () => {
  return (
    <section className="bg-gray-700">
      <div className="flex flex-col justify-center items-center h-screen">
        <Link
          to="/home"
          className="flex flex-row gap-3 text-green-500 hover:text-white 
          font-bold text-4xl py-10 px-4 transition-all duration-300 ease-linear
          cursor-pointer"
        >
          <FaChessPawn size="100" classNamerequired />
        </Link>

        <div className="w-full rounded-lg shadow-lg border-2 md:mt-0 sm:max-w-md xl:p-0 bg-gray-900">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Let's set up your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Username
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  required
                />
              </div>

              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border sm:text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Retype your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border sm:text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-500 hover:bg-green-400 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5 text-center"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
