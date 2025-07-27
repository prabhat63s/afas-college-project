import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useAuth } from "../../context/auth";
import AuthLayout from "./AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(email)) {
        setError("Please enter a valid email");
        return;
      }
      if (!validatePassword(password)) {
        setError(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
      }

      setError(""); // Clear the error state if no validation errors

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/sign-in`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full pb-10 mb-10 border-b">
        <h1 className="text-2xl font-semibold mb-2">आपका फिर से स्वागत है।</h1>
        <p>अपने ईमेल से सैन इन करें या एक खाता बनाएं|</p>
      </div>
      <div className="w-full lg:min-h-[50vh] flex flex-col lg:flex-row gap-10 lg:divide-x">
        <div className="w-full lg:w-[50%] h-full flex items-center justify-center">
          <form
            className="flex flex-col space-y-6 w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="text-xl font-semibold mb-2">लॉग इन</h1>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                आपका ईमेल
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border text-sm rounded-lg block w-full p-3"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && (
                <div className="text-emerald-600 pt-2 text-xs">{error}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                आपका पासवर्ड
              </label>
              <div className="flex items-center text-gray-900 p-3 border rounded-lg w-full">
                <input
                  type={isShowPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full outline-none bg-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isShowPassword ? (
                  <IoEyeOutline
                    size={18}
                    onClick={toggleShowPassword}
                    className="text-neutral-600 cursor-pointer"
                  />
                ) : (
                  <IoEyeOffOutline
                    size={18}
                    onClick={toggleShowPassword}
                    className="text-neutral-600 cursor-pointer"
                  />
                )}
              </div>
              {error && (
                <div className="text-emerald-600 pt-2 text-xs">{error}</div>
              )}
            </div>
            <Link
              to="/forgot-password"
              className="text-emerald-600 text-sm hover:text-black"
            >
              पासवर्ड भूल गए?
            </Link>
            <button
              type="submit"
              className="w-fit text-white bg-emerald-600 hover:bg-emerald-500 gap-2 font-medium rounded-lg px-5 py-2.5 text-center shadow-lg"
            >
              लॉग इन
            </button>
          </form>
        </div>

        <div className="w-full lg:w-[50%] lg:pl-10 h-full flex items-center justify-center">
          <div className="space-y-6 w-full flex flex-col gap-2">
            <h1 className="text-xl font-semibold">नये ग्राहक</h1>
            <p>
              हमारे नए ग्राहकों के बढ़ते परिवार का हिस्सा बनें! आज ही हमसे
              जुड़ें और विशेष लाभों, ऑफ़र और व्यक्तिगत अनुभवों की दुनिया को
              अनलॉक करें।
            </p>
            <Link to="/sign-up">
              <button className="w-fit text-white bg-emerald-600 hover:bg-emerald-500 gap-2 font-medium rounded-lg px-5 py-2.5 text-center shadow-lg">
                साइन अप
              </button>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
