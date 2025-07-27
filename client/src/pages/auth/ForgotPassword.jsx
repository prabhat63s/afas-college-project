import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { validateEmail, validatePassword } from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Layout from "../../components/layout/Layout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(email)) {
        setError("Please enter a valid email");
        return;
      }
      if (!validatePassword(newPassword)) {
        setError(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
      }
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/sign-in");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="w-full py-10 flex flex-col lg:flex-row gap-20 px-6 items-center justify-center">
        <div className="lg:w-[40%] w-full  hidden lg:flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-vector/organic-farming-concept_23-2148421518.jpg?size=626&ext=jpg&ga=GA1.1.1064716352.1714105038&semt=ais"
            alt=""
            className="w-60 lg:w-full"
          />
        </div>

        <div className="w-full flex flex-col lg:w-[40%]">
          <h2 className="text-2xl font-bold text-emerald-500">
            अपना पासवर्ड पुनः प्राप्त करें
          </h2>
          <form
            className="space-y-4 w-full lg:w-[80%] mt-5"
            onSubmit={handleSubmit}
          >
            <div className="w-full mt-2">
              <label htmlFor="email" className="block mb-2  text-gray-900">
                अपना ईमेल दर्ज करें
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block  text-gray-900">
                सुरक्षा प्रश्न
              </label>
              <div className="flex flex-col mt-2 gap-4 lg:flex-row ">
                <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5">
                  <option value="" disabled>
                    --सुरक्षा प्रश्न चुनें--
                  </option>
                  <option value="">तुम कौन से शहर मे पैदा हुए?</option>
                  <option value="">आपने किस हाई स्कूल में पढ़ाई की?</option>
                  <option value="">आपके पसंदीदा टूल का नाम क्या है?</option>
                </select>
                <input
                  name="text"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="उत्तर"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                />
              </div>
            </div>
            <label htmlFor="email" className="block mb-2  text-gray-900">
              अपना पासवर्ड भरें
            </label>
            <div className="flex items-center text-gray-900 py-3 px-2 shadow-sm placeholder:text-gray-400  bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5">
              <input
                name="password"
                type={isShowPassword ? "text" : "password"}
                autoComplete="current-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full outline-none bg-transparent"
              />
              {isShowPassword ? (
                <IoEyeOutline
                  size={18}
                  onClick={() => toggleShowPassword()}
                  className="text-neutral-600"
                />
              ) : (
                <IoEyeOffOutline
                  size={18}
                  onClick={() => toggleShowPassword()}
                  className="text-neutral-600"
                />
              )}
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <div className="pt-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2 leading-6 text-white shadow-sm hover:bg-emerald-400 "
              >
                पासवर्ड रीसेट
              </button>
            </div>
          </form>

          <p className="text-center text-sm mt-4 text-gray-500">
            या वापस लौटें{" "}
            <Link
              to="/sign-in"
              className="font-semibold leading-6 text-emerald-500 hover:text-emerald-400"
            >
              साइन इन करें
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
