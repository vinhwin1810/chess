import { FaHome } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { useAuth } from "../AuthContext"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Adjust as necessary based on your routing setup
  };
  return (
    <div className=" fixed top-0 left-0 h-screen w-16 bg-gray-900 m-0 flex flex-col text-white shadow-sm">
      <button onClick={() => navigate("/")}>
        <NavbarIcons icon={<FaHome size="28" />} text={"Home"} />
      </button>
      <Divider />

      <button onClick={() => navigate("/play")}>
        <NavbarIcons icon={<FaGooglePlay size="25" />} text={"Play"} />
      </button>
      <Divider />

      <button onClick={handleLogout}>
        <NavbarIcons icon={<IoLogOut size="25" />} text={"Log out"} />
      </button>
    </div>
  );
};
const NavbarIcons = ({ icon, text }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;
export default Navbar;
