import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { BiSolidSend } from "react-icons/bi";
import { details, social } from "../data/Data";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import Layout from "../components/layout/Layout";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_gdgixjk",
        "template_5t5nz3q",
        form.current,
        "_9yNk3LSpKuacUBbk"
      )
      .then(
        () => {
          form.current.reset();
          toast.success("संदेश सफलतापूर्वक भेजा जा चुका है!");
        },
        (error) => {
          toast.error("संदेश नहीं भेजा गया!");
        }
      );
  };

  return (
    <Layout>
      <div className="h-full md:px-10">
        <div className="lg:max-w-7xl mx-auto my-10 px-4">
          <h1 className="text-black text-2xl mb-4 font-bold w-fit border-b-4">
            संपर्क में <span className="text-emerald-500">रहे</span>
          </h1>

          <div className=" w-full flex justify-between flex-col items-center text-black md:flex-row">
            <div className=" w-full flex justify-center items-center lg:w-[40%] ">
              <div className=" w-[100%]">
                {details.map(({ id, icon, title }) => (
                  <div
                    id={id}
                    className="w-full h-14 rounded-lg flex shadow-sm items-center bg-gray-50 my-8"
                  >
                    <span className="text-emerald-500 mx-3">{icon}</span>
                    {title}
                  </div>
                ))}
                <div className="w-full h-14 rounded-lg flex items-center shadow-sm bg-gray-50 text-emerald-500 text-xl my-4">
                  {social.map(({ id, to, title }) => (
                    <NavLink id={id} to={to} className="mx-5">
                      {title}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            <div className=" w-full md:w-[60%]">
              <form
                ref={form}
                onSubmit={sendEmail}
                className="mx-auto max-w-2xl flex-col flex gap-4 "
              >
                <div className="grid grid-cols-1 text-black gap-x-8 gap-y-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="from_name"
                    placeholder="नाम"
                    className="block w-full rounded-md shadow-sm bg-gray-50 border-0 px-3.5 py-3 placeholder:text-gray-800"
                  />
                  <input
                    type="tele"
                    name="from_phone"
                    placeholder="फ़ोन नंबर"
                    className="block w-full rounded-md  px-3.5 py-3 shadow-sm bg-gray-50 placeholder:text-gray-800"
                  />
                </div>
                <input
                  type="email"
                  name="from_email"
                  placeholder="ईमेल"
                  className="block w-full rounded-md  px-3.5 py-3 shadow-sm bg-gray-50 placeholder:text-gray-800"
                />

                <div className="sm:col-span-2">
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="मेसेज"
                    className="block w-full rounded-md border-0 px-3.5 py-4 shadow-sm bg-gray-50 resize-none placeholder:text-gray-800"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    value="Send"
                    className="flex items-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm shadow-sm  font-semibold text-white hover:bg-emerald-400"
                  >
                    मेसेज भेजें
                    <span className="ml-3">
                      <BiSolidSend />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
