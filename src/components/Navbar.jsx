import { FaHome } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className=" fixed top-0 left-0 h-screen w-16 bg-gray-900 m-0 flex flex-col text-white shadow-sm">
      <NavbarIcons icon={<FaHome size="28" />} text={"Home"} />
      <Divider />
      <NavbarIcons icon={<FaGooglePlay size="25" />} text={"Play"} />
      <Divider />
      <NavbarIcons icon={<IoLogOut size="25" />} text={"Log out"} />
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
