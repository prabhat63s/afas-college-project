import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout"; import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function Greenhouse() {
  const [greenhouse, setGreenhouse] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllGreenhouse = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/greenhouse/get-greenhouse`
      );
      const data = response.data; // Extract data from response

      // Check if 'data' is defined and 'success' is true
      if (data && data.success) {
        setGreenhouse(data.greenhouse); // Update state with fetched data
      } else {
        // Handle the case where 'data' is undefined or 'success' is false
        toast.error("Failed to fetch greenhouse data");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching Greenhouse");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllGreenhouse();
  }, []);

  return (
    <Layout>
      <div className="w-[100%]">
        <div className="lg:max-w-7xl mx-auto my-10 px-4">
          <div className="pb-6 mb-10 border-b">
            <h1 className="text-2xl text-emerald-500 font-semibold mb-2">
              {" "}
              ग्रीन हाउस
            </h1>
            <p className="flex items-start justify-start ">
              ग्रीनहाउस एक नियंत्रित वातावरण है जिसका उपयोग कृषि और बागवानी में
              पौधों की खेती के लिए किया जाता है। इसे खुले मैदान की तुलना में
              अधिक नियंत्रित और अनुकूल बढ़ते वातावरण प्रदान करने के लिए डिज़ाइन
              किया गया है, जिससे उत्पादकों को बढ़ते मौसम का विस्तार करने, पौधों
              को प्रतिकूल मौसम की स्थिति से बचाने और पौधों की वृद्धि के लिए
              आदर्श स्थिति बनाने की अनुमति मिलती है।
            </p>
          </div>

          <div className=" space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {loading ? (
                <Spinner />
              ) : (
                greenhouse.map((g, index) => (
                  <div
                    key={g._id}
                    className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50"
                  >
                    <h1 className="flex items-start justify-start">
                      <span className="font-medium text-lg text-emerald-500">
                        {index + 1}. {g.name}
                      </span>
                    </h1>
                    {/* Map over descriptions array */}
                    {g.descriptions.map((description, descIndex) => (
                      <p key={descIndex} className=" flex mt-2 gap-2">
                        <span className="text-4xl text-emerald-500">.</span>
                        {description}
                      </p>
                    ))}
                  </div>
                ))
              )}
            </div>

            <p className="flex items-start justify-start ">
              ग्रीनहाउस ने उत्पादकों को मौसम से संबंधित नुकसान के जोखिम को कम
              करते हुए बढ़ती परिस्थितियों को अनुकूलित करने और फसल की पैदावार
              बढ़ाने की अनुमति देकर आधुनिक कृषि में क्रांति ला दी है। वे वैश्विक
              खाद्य उत्पादन और सजावटी पौधों की खेती में महत्वपूर्ण भूमिका निभाते
              हैं।
            </p>
          </div>
          <Link
            to="/contact"
            className="flex items-center rounded-md mt-6 w-full lg:w-fit bg-emerald-500 px-3.5 py-2.5 text-white hover:bg-emerald-400"
          >
            ग्रीनहाउस बनाने के लिए हमसे संपर्क करें
          </Link>
        </div>
      </div>
    </Layout>
  );
}
