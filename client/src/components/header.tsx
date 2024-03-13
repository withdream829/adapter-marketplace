import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { logout } from "../redux/features/auth/authSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-[10vh] w-screen bg-gray-200 flex items-center justify-between px-10">
      <div className="flex items-center">
        {/* User Avatar */}
        <div className="flex items-center justify-center w-12 h-12 bg-gray-400 rounded-full cursor-pointer relative">
          <Icon icon="ooui:user-active" width="24" height="24" />
        </div>
      </div>
      <div className="flex items-center">
        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            className="w-80 pl-10 pr-4 py-2 rounded-full outline-none ring-1 ring-gray-300 focus:ring-gray-500"
            placeholder="Search..."
          />
          <div className="absolute top-0 left-0 mt-2 ml-3">
            <Icon
              icon="lets-icons:search-duotone-line"
              width="24"
              height="24"
            />
          </div>
        </div>

        <Icon
          onClick={handleLogout}
          icon="icon-park:logout"
          width="24"
          height="24"
          className="ml-4"
        />
      </div>
    </div>
  );
};

export default Header;
