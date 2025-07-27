import { NavLink } from "react-router-dom";

export default function AdminNav() {
  return (
    <div className="w-full flex flex-col space-y-2">
      {/* dashboard */}
      <NavLink
        to="/dashboard/admin"
        className={({ isActive }) =>
          `px-4 py-2.5 transition-colors duration-200 ${
            isActive
              ? "bg-emerald-500 text-white rounded-lg"
              : "bg-white text-black hover:bg-emerald-500 hover:text-white rounded-lg "
          }`
        }
      >
        <span>डैशबोर्ड</span>
      </NavLink>
      {/* season */}
      <NavLink
        to={"/dashboard/createCategory"}
        className={({ isActive }) =>
          `px-4 py-2.5 transition-colors duration-200 ${
            isActive
              ? "bg-emerald-500 text-white rounded-lg"
              : "bg-white text-black hover:bg-emerald-500 hover:text-white rounded-lg "
          }`
        }
      >
        <span>विभिन्न ऋतुएँ</span>
      </NavLink>
      {/* Create Crops */}
      <NavLink
        to={"/dashboard/createCrop"}
        className={({ isActive }) =>
          `px-4 py-2.5 transition-colors duration-200 ${
            isActive
              ? "bg-emerald-500 text-white rounded-lg"
              : "bg-white text-black hover:bg-emerald-500 hover:text-white rounded-lg "
          }`
        }
      >
        <span> फसल</span>
      </NavLink>
      {/* all crops */}
      <NavLink
        to={"/dashboard/crops"}
        className={({ isActive }) =>
          `px-4 py-2.5 transition-colors duration-200 ${
            isActive
              ? "bg-emerald-500 text-white rounded-lg"
              : "bg-white text-black hover:bg-emerald-500 hover:text-white rounded-lg "
          }`
        }
      >
        <span> सभी फसलें</span>
      </NavLink>
      {/* News */}
      <NavLink
        to={"/dashboard/news"}
        className={({ isActive }) =>
          `px-4 py-2.5 transition-colors duration-200 ${
            isActive
              ? "bg-emerald-500 text-white rounded-lg"
              : "bg-white text-black hover:bg-emerald-500 hover:text-white rounded-lg "
          }`
        }
      >
        <span> समाचार</span>
      </NavLink>
      {/* Organic ferti */}
      <NavLink
        to={"/dashboard/organicFerti"}
        className={({ isActive }) =>
          `px-4 py-2.5 transition-colors duration-200 ${
            isActive
              ? "bg-emerald-500 text-white rounded-lg"
              : "bg-white text-black hover:bg-emerald-500 hover:text-white rounded-lg "
          }`
        }
      >
        <span> जैविक खाद</span>
      </NavLink>
      {/* greenhouse */}
      <NavLink
        to={"/dashboard/greenhouse"}
        className={({ isActive }) =>
          `px-4 py-2.5 transition-colors duration-200 ${
            isActive
              ? "bg-emerald-500 text-white rounded-lg"
              : "bg-white text-black hover:bg-emerald-500 hover:text-white rounded-lg "
          }`
        }
      >
        <span> ग्रीन हाउस</span>
      </NavLink>
      {/* stubble */}
      <NavLink
        to={"/dashboard/stubble"}
        className={({ isActive }) =>
          `px-4 py-2.5 transition-colors duration-200 ${
            isActive
              ? "bg-emerald-500 text-white rounded-lg"
              : "bg-white text-black hover:bg-emerald-500 hover:text-white rounded-lg "
          }`
        }
      >
        <span>पराली</span>
      </NavLink>
      {/* Store seed */}
      <NavLink
        to={"/dashboard/seed-store"}
        className={({ isActive }) =>
          `px-4 py-2.5 transition-colors duration-200 ${
            isActive
              ? "bg-emerald-500 text-white rounded-lg"
              : "bg-white text-black hover:bg-emerald-500 hover:text-white rounded-lg "
          }`
        }
      >
        <span>बीज भंडारित करें</span>
      </NavLink>
      {/* Soil testing */}
      <NavLink
        to={"/dashboard/soil-testing"}
        className={({ isActive }) =>
          `px-4 py-2.5 transition-colors duration-200 ${
            isActive
              ? "bg-emerald-500 text-white rounded-lg"
              : "bg-white text-black hover:bg-emerald-500 hover:text-white rounded-lg "
          }`
        }
      >
        <span>मिट्टी परीक्षण</span>
      </NavLink>
      {/* Adv Equip */}
      <NavLink
        to={"/dashboard/advance-eqp"}
        className={({ isActive }) =>
          `px-4 py-2.5 transition-colors duration-200 ${
            isActive
              ? "bg-emerald-500 text-white rounded-lg"
              : "bg-white text-black hover:bg-emerald-500 hover:text-white rounded-lg "
          }`
        }
      >
        <span> उन्नत उपकरण</span>
      </NavLink>
    </div>
  );
}
