import React from "react";
import { Link, NavLink } from "react-router-dom";
import { company, contact, legal, social } from "../../data/Data";
import logo from "../../assets/favicon.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#1e1e1e] py-10 text-white">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <NavLink to="/" className="flex items-center gap-1 pb-5">
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
          <p className="text-sm">
            © {currentYear} <span>अपनी फसल अपनी सुरक्षा</span>. सर्वाधिकार
            सुरक्षित।
          </p>
        </div>

        {/* Company Section */}
        <div className="flex flex-col">
          <h1 className="text-emerald-500 text-lg lg:text-xl mb-2">बारे में</h1>
          {company.map(({ to, title }) => (
            <NavLink
              to={to}
              key={title}
              className="text-sm my-1 hover:text-emerald-500 transition-colors duration-200"
            >
              {title}
            </NavLink>
          ))}
        </div>

        {/* Contact Section */}
        <div className="flex flex-col">
          <h1 className="text-emerald-500 text-lg lg:text-xl mb-2">
            संपर्क करें
          </h1>
          {contact.map(({ to, title }) => (
            <NavLink
              to={to}
              key={title}
              className="text-sm my-1 hover:text-emerald-500 transition-colors duration-200"
            >
              {title}
            </NavLink>
          ))}
        </div>

        {/* Legal Section */}
        <div className="flex flex-col">
          <h1 className="text-emerald-500 text-lg lg:text-xl mb-2">कानूनी</h1>
          {legal.map(({ to, id, title }) => (
            <NavLink
              to={to}
              key={id}
              id={id}
              className="text-sm my-1 hover:text-emerald-500 transition-colors duration-200"
            >
              {title}
            </NavLink>
          ))}
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col">
          <h1 className="text-emerald-500 text-lg lg:text-xl mb-2">
            हमारे साथ जुड़ें
          </h1>
          <div className="flex gap-4">
            {social.map((s) => (
              <Link
                to={s.to}
                key={s.id}
                target="_blank"
                className="text-xl hover:text-emerald-500 transition-colors duration-200"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
