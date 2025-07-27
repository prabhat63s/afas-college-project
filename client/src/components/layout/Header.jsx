import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/favicon.png";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { RiCloseLine, RiHomeLine } from "react-icons/ri";
import { HiBars2, HiOutlineShoppingBag } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { TbMessageCircle, TbBrandMailgun } from "react-icons/tb";
import { MdOutlineRoundaboutRight, MdOutlineDashboardCustomize } from "react-icons/md";

const navigations = [
  {
    title: "होम",
    link: "/",
    icon: <RiHomeLine size={24} />,
  },
  {
    title: "बारे में",
    link: "/about",
    icon: <MdOutlineRoundaboutRight size={24} />,
  },
  {
    title: "संपर्क करें",
    link: "/contact",
    icon: <TbBrandMailgun size={24} />,
  },
  {
    title: "दुकान",
    link: "https://dukaan-online-shopping-site.onrender.com",
    icon: <HiOutlineShoppingBag size={24} />,
  },
];

function Header() {
  const [auth, setAuth] = useAuth();
  const [navOpen, setNavOpen] = useState(false);

  // Handle logout
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    window.location = "/";
  };

  // Toggle mobile navigation
  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <>
      <div className="w-full bg-emerald-500">
        <div className="lg:max-w-7xl mx-auto h-12 flex justify-end gap-6 px-4 items-center text-white">
          <div id="google_translate_element" className="translate "></div>
          {auth?.user ? (
            <>
              <button className="flex relative group" onClick={handleLogout}>
                लॉग आउट
                <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100"></span>
              </button>
              <NavLink
                to={`/dashboard/${
                  auth?.user?.role === 1 ? "admin" : "community"
                }`}
                className="flex relative group"
              >
                {auth?.user?.role === 1 ? "डैशबोर्ड" : "परामर्श"}
                <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100"></span>
              </NavLink>
            </>
          ) : (
            <NavLink to="/sign-in" className="flex relative group">
              <span>साइन इन</span>
              <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100"></span>
            </NavLink>
          )}
        </div>
      </div>

      <header className="w-full border-b">
        <div className="lg:max-w-7xl h-[10vh] mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigations.map((nav, index) => (
              <NavLink key={index} to={nav.link} className="btn relative group">
                {nav.title}
                <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-emerald-600 transform scale-x-0 group-hover:scale-x-100"></span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex lg:hidden items-center gap-4">
            {!navOpen ? (
              <HiBars2
                className="cursor-pointer text-emerald-600"
                size={30}
                onClick={toggleNav}
              />
            ) : (
              <RiCloseLine
                className="cursor-pointer text-emerald-600"
                size={30}
                onClick={toggleNav}
              />
            )}
          </div>

          {/* Mobile Navigation Menu */}
          {navOpen && (
            <div className="absolute z-50 top-32 right-0 w-full bg-white text-black border-b p-5">
              <div className="flex flex-col gap-2">
                {navigations.map((nav, index) => (
                  <NavLink
                    key={index}
                    to={nav.link}
                    className={({ isActive }) =>
                      `px-4 py-3 flex items-center gap-4 transition-colors duration-200 ${
                        isActive
                          ? "bg-emerald-600 text-white rounded-lg"
                          : "bg-white text-black hover:bg-emerald-600 hover:text-white rounded-lg "
                      }`
                    }
                  >
                    {nav.icon}
                    {nav.title}
                  </NavLink>
                ))}

                {auth?.user ? (
                  <>
                    <NavLink
                      to={
                        auth.user.role === 1
                          ? "/dashboard/admin"
                          : "/dashboard/user"
                      }
                      className={({ isActive }) =>
                        `p-4 transition-colors duration-200 ${
                          isActive
                            ? "bg-emerald-600 text-white rounded-lg"
                            : "hover:bg-emerald-600 hover:text-white rounded-lg"
                        }`
                      }
                      onClick={toggleNav}
                    >
                      {auth?.user?.role === 1 ? (
                        <span className="flex gap-4">
                          <MdOutlineDashboardCustomize size={24} /> डैशबोर्ड
                        </span>
                      ) : (
                        <span className="flex gap-4">
                          <TbMessageCircle size={24} /> परामर्श
                        </span>
                      )}
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="p-4 flex items-center hover:bg-emerald-600 hover:text-white rounded-lg"
                    >
                      <FiLogOut size={24} />
                      <span>लॉग आउट</span>
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/sign-in"
                    className={({ isActive }) =>
                      `p-4 flex items-center gap-4 transition-colors duration-200 ${
                        isActive
                          ? "bg-emerald-600 text-white rounded-lg"
                          : "hover:bg-emerald-600 hover:text-white rounded-lg"
                      }`
                    }
                    onClick={toggleNav}
                  >
                    <GoPerson size={24} />
                    <span>साइन इन</span>
                  </NavLink>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
