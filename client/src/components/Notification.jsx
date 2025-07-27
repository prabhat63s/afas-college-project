import React from "react";
import classNames from "classnames";
import { BiSolidMicrophone } from "react-icons/bi";

const Notification = ({ show }) => {
  return (
    <div
      className={classNames(
        "fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300",
        {
          "opacity-100 pointer-events-auto": show,
          "opacity-0 pointer-events-none": !show,
        }
      )}
    >
      <span class="relative flex h-36  w-36">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-100 opacity-75"></span>
        <span class="relative inline-flex rounded-full items-center justify-center h-36  w-36 bg-gray-100">
          <BiSolidMicrophone size={40} />
        </span>
      </span>
    </div>
  );
};

export default Notification;
