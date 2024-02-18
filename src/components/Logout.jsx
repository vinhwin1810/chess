import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage or your state management solution
    localStorage.removeItem("authToken"); // Adjust this key to match where your token is stored

    // Optionally, clear any other user-related data from your state management

    // Navigate to the homepage or login page
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="your-logout-button-classes">
      Log Out
    </button>
  );
};

export default Logout;
