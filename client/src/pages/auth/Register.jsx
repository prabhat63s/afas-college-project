import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import AuthLayout from "./AuthLayout";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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

      setError("");

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/sign-up`,
        {
          name,
          email,
          password,
          answer,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/");
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
        <h1 className="text-2xl font-semibold mb-2">
          लगता है आप यहां नये हैं!
        </h1>
        <p>आरंभ करने के लिए अपने ईमेल के साथ साइन अप करें</p>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-10 lg:divide-x">
        <div className="w-full lg:w-[50%] h-full flex items-center justify-center">
          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            <h1 className="text-xl font-semibold mb-2">साइन अप</h1>

            <div className="flex flex-col lg:flex-row w-full gap-4">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  पूरा नाम
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="नाम"
                  className="border text-sm rounded-lg block w-full p-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="w-full">
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
              </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-4">
              <div className="w-full ">
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
                      className="cursor-pointer text-neutral-600"
                    />
                  ) : (
                    <IoEyeOffOutline
                      size={18}
                      onClick={toggleShowPassword}
                      className="cursor-pointer text-neutral-600"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-2">
              <select
                name="securityQuestion"
                className="border w-full rounded-md text-sm p-3"
              >
                <option value="" disabled>
                  --सुरक्षा प्रश्न चुनें--
                </option>
                <option value="In what city were you born?">
                  तुम कौन से शहर मे पैदा हुए?
                </option>
                <option value="What high school did you attend?">
                  What high school did you attend?
                </option>
              </select>

              <input
                name="answer"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="उत्तर"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
              />
            </div>
            {error && <p className="text-red-600 pt-2 text-xs">{error}</p>}

            <button
              type="submit"
              className="w-fit text-white bg-emerald-600 hover:bg-emerald-500 gap-2 font-medium rounded-lg px-5 py-2.5 text-center"
            >
              साइन अप
            </button>
          </form>
        </div>

        <div className="w-full lg:w-[50%] lg:pl-10 h-full flex items-center justify-center">
          <div className="space-y-6 w-full flex flex-col gap-2">
            <h1 className="text-xl font-semibold">
              क्या आपके पास पहले से एक खाता मौजूद है?
            </h1>
            <p>
              आपका फिर से स्वागत है। अपने व्यक्तिगत अनुभव, सहेजी गई प्राथमिकताओं
              और बहुत कुछ तक पहुँचने के लिए साइन इन करें। हमें आपको फिर से हमारे
              साथ पाकर बहुत खुशी हो रही है!
            </p>
            <Link to="/sign-in">
              <button className="w-fit text-white bg-emerald-600 hover:bg-emerald-500 gap-2 font-medium rounded-lg px-5 py-2.5 text-center shadow-lg">
                लॉग इन
              </button>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
