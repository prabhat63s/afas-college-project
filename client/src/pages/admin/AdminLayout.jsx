import { useState } from "react";
import AdminNav from "./AdminNav";
import { HiBars2 } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/favicon.png";
import { RiCloseLine } from "react-icons/ri";
import { useAuth } from "../../context/auth";
import { FiSearch } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import toast from "react-hot-toast";

export default function AdminLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle logout
  const handleLogout = () => {
    try {
      // Clear auth state and local storage
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");

      toast("Logout successfully");

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast("Failed to logout. Please try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Search query:", searchQuery);
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Header with menu bar for mobile */}
      <header className="w-full bg-white p-4 lg:px-10 flex justify-between items-center border-b">
        <NavLink to="/" className="flex items-center gap-1">
          <div className="flex items-center space-x-2">
            <img className="h-12 w-12" src={logo} alt="Your Company" />
            <h1 className="font-extrabold font-serif flex flex-col text-xl">
              अपनी फसल{" "}
              <span className=" text-emerald-500 ml-6 -mt-1.5">
                अपनी सुरक्षा
              </span>
            </h1>
          </div>
        </NavLink>
        <div className="lg:w-[60%] flex justify-between">
          <div className="hidden lg:flex justify-between w-full">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search here..."
                className="border rounded-full py-2 px-4 pl-10 w-96"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <FiSearch size={20} />
              </button>
            </form>

            {/* User Profile Dropdown */}
            <div className="relative">
              <div
                className="flex gap-3 items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <GoPerson
                  size={40}
                  className="border-2 text-emerald-500 border-red-50 rounded-full"
                />
                <p className="flex flex-col mb-0">
                  {auth?.user?.name}
                  <span className="text-xs text-neutral-600">
                    {auth?.user?.role === 1 ? "Admin" : ""}
                  </span>
                </p>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white hover:bg-gray-50 border rounded-lg shadow-lg py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2"
                  >
                    लॉग आउट
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex lg:hidden">
            {!isMenuOpen ? (
              <HiBars2
                className="cursor-pointer text-emerald-500 "
                size={30}
                onClick={toggleMenu}
              />
            ) : (
              <RiCloseLine
                className="cursor-pointer text-emerald-500"
                size={30}
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
      </header>

      {/* Menu content, visible only when isMenuOpen is true */}
      {isMenuOpen && (
        <nav className="fixed z-50 top-16 right-0 w-[100%] bg-white border-b p-4 lg:hidden">
          <AdminNav />
        </nav>
      )}

      <div className="flex h-screen bg-gray-50">
        <div className="hidden lg:flex p-4 lg:px-10 w-[20%] bg-white whitespace-nowrap">
          <AdminNav />
        </div>
        <main className="flex-grow p-4 pb-24 w-[80%] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
