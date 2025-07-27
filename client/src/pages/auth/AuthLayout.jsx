import { NavLink } from "react-router-dom";
import logo from "../../assets/favicon.png";
import Footer from "../../components/layout/Footer";

export default function AuthLayout({ children }) {
  return (
    <div>
      <header className="w-full border-b">
        <div className="lg:max-w-7xl h-[12vh] mx-auto px-4 flex justify-between items-center">
          {/* Logo and Desktop Navigation */}
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
        </div>
      </header>
      <main className="w-full min-h-[75vh] flex flex-col items-center justify-center lg:max-w-7xl mx-auto p-4 my-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
